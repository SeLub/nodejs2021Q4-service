import pkg from 'typeorm'

const { Entity, PrimaryGeneratedColumn, Column, BaseEntity, } = pkg

@Entity('user')

export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string | null

    @Column()
    name: string    

    @Column()
    login: string

    @Column()
    password: string

}
