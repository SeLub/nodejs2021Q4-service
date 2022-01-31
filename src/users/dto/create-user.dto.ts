import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
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