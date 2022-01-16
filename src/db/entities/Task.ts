import pkg from 'typeorm';

const { Entity, PrimaryGeneratedColumn, Column, BaseEntity, } = pkg;

  @Entity('tasks')
  export class Task extends BaseEntity{
      @PrimaryGeneratedColumn('uuid')
      id: string;

      @Column()
      title: string;

      @Column("integer")
      order: number;

      @Column()
      description: string;

      @Column({type: "uuid", nullable: true})
      userId: string;

      @Column({type: "uuid", nullable: true})
      boardId: string;

      @Column({type: "uuid", nullable: true})
      columnId: string;
  }