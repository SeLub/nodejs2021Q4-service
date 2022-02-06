import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity.js';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true, type: 'text' })
  login: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Task, (task) => task.user, {
    eager: false,
  })
  tasks: Task[];
}