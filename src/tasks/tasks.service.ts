import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  create(boardId: string, createTaskDto: CreateTaskDto) {
    const newTask = this.taskRepository.create({
      ...createTaskDto,
      boardId,
      id: randomUUID(),
    });

    return this.taskRepository.save(newTask);
  }

  findAll(boardId: string) {
    return this.taskRepository.find({ where: { boardId } });
  }

  findOne(taskId: string) {
    return this.taskRepository.findOne(taskId);
  }

  async update(taskId: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.findOne(taskId);
    if (task) {
      this.taskRepository.merge(task, updateTaskDto);
      await this.taskRepository.save(task);
    }
    return task;
  }

  remove(taskId: string) {
    return this.taskRepository.delete(taskId);
  }
}
