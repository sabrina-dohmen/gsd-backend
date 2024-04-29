import { Task } from "src/task/entities/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Tag')
export class Tag {

	@PrimaryGeneratedColumn('increment', { name:'id'})
	id: number;

	@Column({ name:'Name', type:'varchar', length:10, nullable:false })
	name: string;

	@Column({ name:'Desription', type:'varchar', length:6, nullable:false })
	color: string;

    @OneToMany(() => Task, (task) => task.tag)
    task: Task;
}
