import {BadRequestException, PipeTransform} from '@nestjs/common';
import {TaskStatus} from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform {

    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.DONE,
        TaskStatus.IN_PROGRESS,
    ];

    transform(value: any) {
        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`"${value}" is not valid task status!`);
        }

        return value;
    }

    private isStatusValid(status: any) {
        return this.allowedStatuses.indexOf(status) !== -1;
    }
}
