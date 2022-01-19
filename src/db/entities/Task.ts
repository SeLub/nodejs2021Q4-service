import pkg from 'typeorm'

import { User } from './User.js'
import { Board } from './Board.js'

const { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} = pkg

@Entity('task')
  export class Task extends BaseEntity{
      @PrimaryGeneratedColumn('uuid')
      id: string | null

      @Column()
      title: string

      @Column("integer")
      order: number

      @Column()
      description: string

      //@Column({type: "uuid", nullable: true})
      @ManyToOne(() => User, { onDelete: 'SET NULL' })
      userId: string | null

      //@Column({type: "uuid", nullable: true})
      @ManyToOne(() => Board, { onDelete: 'CASCADE' })
      boardId: string | null

      @Column({type: "uuid", nullable: true})
      columnId: string | null
  }
