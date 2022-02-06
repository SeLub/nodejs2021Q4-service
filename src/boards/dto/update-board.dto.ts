import { PartialType } from '@nestjs/mapped-types';
import { IsOptional,  IsUUID } from 'class-validator';
import { CreateBoardDto } from './create-board.dto';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  @IsUUID()
  @IsOptional()
  id?: string;
}