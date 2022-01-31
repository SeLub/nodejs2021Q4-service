import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Board } from '../../boards/entities/board.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @Column()
  description!: string;

  @Column({ type: 'uuid', nullable: true })
  userId!: string | null;

  @Column({ type: 'uuid', nullable: true })
  boardId!: string | null;

  @Column({ type: 'uuid', nullable: true })
  columnId!: string | null;

  @ManyToOne(() => User, (user) => user.tasks, {
    eager: false,
    onDelete: 'SET NULL',
  })
  user!: User;

  @ManyToOne(() => Board, (board) => board.tasks, {
    eager: false,
    onDelete: 'CASCADE',
  })
  board!: Board;
}