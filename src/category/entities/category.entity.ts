import { Task } from "src/task/entities/task.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Category')
export class Category {

    @PrimaryGeneratedColumn('increment', { name:'id'})
	id: number;

	@Column({ name:'Name', type:'varchar', length:10, nullable:false })
	name: string;

	@Column({ name:'Desription', type:'varchar', length:6, nullable:false })
	color: string;

    @OneToMany(() => Task, (task) => task.category)
    task: Task;

}
