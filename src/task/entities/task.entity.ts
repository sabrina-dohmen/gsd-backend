import { Category } from "src/category/entities/category.entity";
import { Tag } from "src/tag/entities/tag.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Task')
export class Task {

	@PrimaryGeneratedColumn('increment', { name:'id'})
	id: number;

	@Column({ name:'Name', type:'varchar', length:60, nullable:false })
	name: string;

	@Column({ name:'Desription', type:'varchar', length:500, nullable:true })
	description: string;

	@Column({ name:'Date', type:'datetime', nullable:true })
	date: string;

	@Column({ name:'Done', type:'bit', nullable:false })
	done: string;

	@ManyToOne(() => Tag, (tag) => tag.task, {cascade: true})
	tag: Tag;

	@ManyToOne(() => Category, (category) => category.task, {cascade: true})
	category: Tag;

}
