import pkg, { Connection } from 'typeorm'

import { 
      POSTGRES_HOST, 
      POSTGRES_PORT, 
      POSTGRES_USER, 
      POSTGRES_PASSWORD, 
      POSTGRES_DB } from '../common/config.js'

import { User } from '../resources/users/user.model.js'
import { Task } from '../resources/tasks/task.model.js'
import { Board } from '../resources/boards/board.model.js'
// import { Columns } from './entities/Column.js'

const { createConnection } = pkg

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
        process.stdout.write(' 🧲✨ Database connected✨🧲\n')
        return connection
    })
}
