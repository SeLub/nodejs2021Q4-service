import { Controller, Get, Post, Body, Patch, Param, Delete,ParseUUIDPipe } from '@nestjs/common';
import { BoardsService } from './boards.service.js';
import { CreateBoardDto } from './dto/create-board.dto.js';
import { UpdateBoardDto } from './dto/update-board.dto.js';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  @Get()
  findAll() {
    return this.boardsService.findAll();
  }

  @Get(':boardId')
  findOne(@Param('boardId', ParseUUIDPipe) boardId: string) {
    return this.boardsService.findOne(boardId);
  }

  @Patch(':boardId')
  update(
    @Param('boardId', ParseUUIDPipe) boardId: string, 
    @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardsService.update(boardId, updateBoardDto);
  }

  @Delete(':boardId')
  remove(@Param('boardId', ParseUUIDPipe) boardId: string) {
    return this.boardsService.remove(boardId);
  }
}
