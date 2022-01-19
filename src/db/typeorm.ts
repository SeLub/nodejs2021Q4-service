import pkg, { Connection } from 'typeorm';

import { 
      POSTGRES_HOST, 
      POSTGRES_PORT, 
      POSTGRES_USER, 
      POSTGRES_PASSWORD, 
      POSTGRES_DB } from '../common/config.js'

import { User } from './entities/User.js';
import { Task } from './entities/Task.js';
import { Board } from './entities/Board.js';

const { createConnection } = pkg;

export default async function connectDB(): Promise<Connection> {
    return createConnection({
      type: 'postgres',
      host: POSTGRES_HOST,
      port: +POSTGRES_PORT,
      username: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      database: POSTGRES_DB,
      entities: [User, Task, Board],
      synchronize: true,
    }).then((connection) => {
        process.stdout.write(' 🧲✨ Database connected✨🧲\n');
        return connection;
    });
}
