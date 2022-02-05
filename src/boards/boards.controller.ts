import { Controller, Get, Post, Body, Put, Param, Delete,ParseUUIDPipe, NotFoundException, UseGuards } from '@nestjs/common';
import { BoardsService } from './boards.service.js';
import { CreateBoardDto } from './dto/create-board.dto.js';
import { UpdateBoardDto } from './dto/update-board.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.boardsService.findAll();
  }

  @Get(':boardId')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('boardId', ParseUUIDPipe) boardId: string) {
    const board = await this.boardsService.findOne(boardId);
    if (!board) {
      throw new NotFoundException('Not Found');
    } else {
      return board;
    }
  }

  @Put(':boardId')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('boardId', ParseUUIDPipe) boardId: string, 
    @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardsService.update(boardId, updateBoardDto);
  }

  @Delete(':boardId')
  @UseGuards(JwtAuthGuard)
  remove(@Param('boardId', ParseUUIDPipe) boardId: string) {
    return this.boardsService.remove(boardId);
  }
}
