import {Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import {Task, TaskStatus} from './task.model';
import {TasksService} from './tasks.service';
import {CreateTaskDto} from './dto/create-task.dto';
import {GetTasksFilterDto} from './dto/get-tasks-filter.dto';
import {TaskStatusValidationPipe} from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService) {}

    @Get()
    async getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]> {
        if (Object.keys(filterDto).length) {
            return this.tasksService.getTasksWithFilters(filterDto);
        }
        return this.tasksService.getAllTasks();
    }

    @Get('/:id')
    async getTaskById(@Param('id') id: string): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    async updateTaskStatus(
        @Param('id') id: string,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    ): Promise<Task> {
        return this.tasksService.updateTaskStatus(id, status);
    }

}