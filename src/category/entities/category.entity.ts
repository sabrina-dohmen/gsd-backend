import { Task } from "src/task/entities/task.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Category')
export class Category {

    @PrimaryGeneratedColumn('increment', { name:'id'})
	id: number;

	@Column({ name:'Name', type:'varchar', length:20, nullable:false })
	name: string;

    @Column({ name:'Code', type:'varchar', length:1, nullable:false })
	code: string;

    @OneToMany(() => Task, (task) => task.category)
    task: Task;

}
