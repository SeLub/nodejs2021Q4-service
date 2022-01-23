import pkg from 'typeorm';

const { Entity, PrimaryGeneratedColumn, Column } = pkg;

export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

@Entity({ name: 'users' })
export class User {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { 
    default: 'USER' 
  })
  name!: string;

  @Column('varchar', { 
    default: 'user' 
  })
  login!: string;

  @Column('varchar', { 
    default: 'P@55w0rd', 
    select: false 
  })
  password!: string;
}
export const toResponse = (user: User): Omit<User, 'password'> => {
  const { id, name, login } = user;
  return { id, name, login };
}
export type UserDto = Omit<IUser, 'password'>;