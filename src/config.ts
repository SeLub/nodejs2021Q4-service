import 'dotenv/config';

const { 
      SERVER_PORT = 4000, 
      LOG_LEVEL,
      POSTGRES_HOST = "db",
      POSTGRES_PORT = 5432,
      POSTGRES_USER = "postgres",
      POSTGRES_PASSWORD = "123456",
      POSTGRES_DB = "postgres",
      NODE_ENV,
      JWT_SECRET_KEY,
      AUTH_MODE,
      SALT
} = process.env;

const serverSettings = { 
      "serverPort": SERVER_PORT,
      "logLevel": LOG_LEVEL,
      "NODE_ENV": NODE_ENV,
      "jwtKey": JWT_SECRET_KEY,
      "authMode": AUTH_MODE,
      "salt": SALT }

import { Board } from './boards/entities/board.entity.js'
import { Task } from './tasks/entities/task.entity.js'
import { User } from './users/entities/user.entity.js'

const ormSettings = {
            "type": "postgres" as "postgres",
            "host": POSTGRES_HOST,
            "port": +POSTGRES_PORT,
            "username": POSTGRES_USER,
            "password": POSTGRES_PASSWORD,
            "database": POSTGRES_DB,
            "entities": [Board, Task, User],
            "synchronize": true
          }

export { ormSettings, serverSettings }