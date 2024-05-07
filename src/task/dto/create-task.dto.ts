import { IsOptional } from "@nestjs/class-validator";
import { Tag } from "src/tag/entities/tag.entity";

export class CreateTaskDto {
    
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
