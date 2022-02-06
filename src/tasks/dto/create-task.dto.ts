import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsInt()
  order: number;

  @IsString()
  description: string;

  @IsUUID()
  @IsOptional()
  userId: string | null;

  @IsUUID()
  @IsOptional()
  boardId: string | null;

  @IsUUID()
  @IsOptional()
  columnId: string | null;
}