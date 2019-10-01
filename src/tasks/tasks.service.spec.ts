import {TasksService} from './tasks.service';
import {TaskRepository} from './task.repository';
import {Test} from '@nestjs/testing';
import {GetTasksFilterDto} from './dto/get-tasks-filter.dto';
import {TaskStatus} from './task-status.enum';
import {User} from '../auth/user.entity';

// tslint:disable-next-line:max-line-length
const mockUser: { password: string; salt: string; id: number; tasks: any[]; username: string } = { id: 1, username: 'Test username', password: '123', salt: '1', tasks: [] };

const mockTaskRepository = () => ({
    getTasks: jest.fn(),
});

describe('TasksService', () => {
    let tasksService: TasksService;
    let taskRepository: TaskRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                TasksService,
                { provide: TaskRepository, useFactory: mockTaskRepository },
            ],
        }).compile();

        tasksService = module.get<TasksService>(TasksService);
        taskRepository = module.get<TaskRepository>(TaskRepository);
    });

    describe('getTasks', () => {
        it('gets all tasks from repository', () => {
            expect(taskRepository.getTasks).not.toHaveBeenCalled();

            const filter: GetTasksFilterDto = { status: TaskStatus.IN_PROGRESS, search: 'some search query' };
            tasksService.getTasks(filter, mockUser);
        });
    });
});
