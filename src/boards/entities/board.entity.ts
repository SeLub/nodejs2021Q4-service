import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('jsonb')
  columns: { id: string; title: string; order: number }[];

  @OneToMany(() => Task, (task) => task.board, {
    eager: false,
  })
  tasks: Task[];
}