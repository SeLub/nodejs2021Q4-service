import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { User } from '../users/entities/user.entity.js';
import { UsersService } from '../users/users.service.js';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    login: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findByLogin(login);

    if (user) { 
        const { password, ...rest } = user;
        const match = await bcryptjs.compare(pass, password);
        if (match) { return rest; }
    }
    return null;
  }

  async login(user: User) {
    const payload = { userId: user.id, login: user.login };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}