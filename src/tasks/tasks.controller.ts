import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('/boards/:boardId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @Param('boardId') boardId: string,
    @Body() createTaskDto: CreateTaskDto)
  {
    return this.tasksService.create(boardId, createTaskDto);
  }

  @Get()
  findAll(
    @Param('boardId') boardId: string)
  {
    return this.tasksService.findAll(boardId);
  }

  @Get(':taskId')
  async findOne(
    @Param('taskId') taskId: string) {
      const task = this.tasksService.findOne(taskId);
      return task;
  }

  @Put(':taskId')
  update(
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(taskId, updateTaskDto);
  }

  @Delete(':taskId')
  remove(@Param('taskId') taskId: string) {
    return this.tasksService.remove(taskId);
  }
}
