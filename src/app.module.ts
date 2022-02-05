import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { BoardsModule } from './boards/boards.module.js';
import { UsersModule } from './users/users.module.js';
import { TasksModule } from './tasks/tasks.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormSettings } from './config.js';
import { AuthModule } from './auth/auth.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { sqlQueries } from './migration/sqlQueries.js';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [() => ormSettings] }),
    TypeOrmModule.forRootAsync({
      imports: [ ConfigModule ],
      useFactory: () => ({
        type: 'postgres',
        host: ormSettings.host,
        port: ormSettings.port,
        username: ormSettings.username,
        password: ormSettings.password,
        database: ormSettings.database,
        synchronize: false,
        logging: false,
        migrationsRun: true,
        entities: ormSettings.entities,
        migrations: [sqlQueries],
        cli: {
          migrationsDir: '../migration',
        },
      }),
      inject: [ConfigService],
    }),
    BoardsModule, 
    UsersModule, 
    TasksModule, AuthModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
