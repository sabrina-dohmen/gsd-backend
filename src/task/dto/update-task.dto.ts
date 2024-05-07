import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsOptional } from '@nestjs/class-validator';
import { Tag } from 'src/tag/entities/tag.entity';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {

    id: number;

    name: string;

    @IsOptional()
    description: string;

    @IsOptional()
    date: string;

    done: string;

    tag: Tag;

    category: Tag;
}
