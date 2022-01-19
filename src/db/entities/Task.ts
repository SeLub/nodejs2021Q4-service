import pkg from 'typeorm'

const { Entity, PrimaryGeneratedColumn, Column, BaseEntity, } = pkg

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

      @Column({type: "uuid", nullable: true})
      userId: string | null

      @Column({type: "uuid", nullable: true})
      boardId: string | null

      @Column({type: "uuid", nullable: true})
      columnId: string | null
  }