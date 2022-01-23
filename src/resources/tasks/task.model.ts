import pkg from 'typeorm';
import { Board } from '../boards/board.model.js';
import { User } from '../users/user.model.js';

const { Entity, PrimaryGeneratedColumn, Column, ManyToOne } = pkg;

export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
}

@Entity({ name: 'tasks' })
export class Task {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: '' })
  title: string;

  @Column({ default: 0 })
  order: number;

  @Column({ default: '' })
  description: string;

  
  @Column('uuid', { nullable: true })
  userId: string | null;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  user?: User | undefined;

  
  @Column('uuid')
  boardId!: string;
  
  @ManyToOne(() => Board, (board) => board.tasks, { onDelete: 'CASCADE' })
  board!: Board | undefined;  


  @Column('varchar', { nullable: true })
  columnId: string | null;  
}