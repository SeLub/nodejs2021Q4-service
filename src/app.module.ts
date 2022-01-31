import { Module } from '@nestjs/common';
//import { AppController } from './app.controller';
//nimport { AppService } from './app.service';
import { BoardsModule } from './boards/boards.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormSettings } from './config.js';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormSettings),
    BoardsModule, 
    UsersModule, 
    TasksModule]
})
export class AppModule {}
