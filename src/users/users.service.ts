import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { serverSettings } from '../config.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const hash = bcryptjs.hashSync(createUserDto.password, parseInt(serverSettings.salt) );

    const newUser = this.usersRepository.create({
      ...createUserDto,
      // id: randomUUID(),
      password: hash,
    });

    return this.usersRepository.save(newUser);
  }

  findAll(): Promise<User[] | undefined> {
    return this.usersRepository.find();
  }

  findOne(id: string) {
    return this.usersRepository.findOne(id);
  }

  findByLogin(login: string) {
    return this.usersRepository.findOne({ login });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne(id);
    if (user) {
      this.usersRepository.merge(user, updateUserDto);
      await this.usersRepository.save(user);
    }
    return user;
  }

 remove(id: string) {
    return this.usersRepository.delete(id);
  }
}
