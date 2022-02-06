import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsUUID } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
  
export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsUUID()
    @IsOptional()
    id?: string;
  }