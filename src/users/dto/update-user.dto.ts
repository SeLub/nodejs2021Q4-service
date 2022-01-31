import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    MinLength,
  } from 'class-validator';
  
  export class UpdateUserDto {
    @IsUUID()
    @IsOptional()
    id?: string;
  
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    login: string;
  
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
  }
