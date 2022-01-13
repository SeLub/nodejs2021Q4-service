import pkg from 'typeorm';

const { Entity, PrimaryGeneratedColumn, Column, BaseEntity, } = pkg;

@Entity('user')

export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column()
    name: string    

    @Column({ unique: true })
    login: string

    @Column()
    password: string

}
