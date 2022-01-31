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

//import { Board } from './resources/boards/board.model.js'

const ormSettings = {
            "type": "postgres" as "postgres",
            "host": POSTGRES_HOST,
            "port": +POSTGRES_PORT,
            "username": POSTGRES_USER,
            "password": POSTGRES_PASSWORD,
            "database": POSTGRES_DB,
            "entities": [Board],
            "synchronize": true
          }

export { ormSettings, serverSettings }