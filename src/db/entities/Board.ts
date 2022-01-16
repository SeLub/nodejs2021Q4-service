import pkg from 'typeorm';

const { Entity, PrimaryGeneratedColumn, Column, BaseEntity, } = pkg;

@Entity('boards')
export class Board extends BaseEntity {
@PrimaryGeneratedColumn('uuid')
id: number;

@Column()
  title: string;

/* @Column("int", { array: true })
columns: ColumnsType[]; */

@Column('jsonb', {nullable: true})
columns: object[];
// columns: ColumnsType[];
}