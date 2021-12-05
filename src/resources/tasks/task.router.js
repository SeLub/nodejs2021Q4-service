
import { getTask, getTasks, addTask, deleteTask, updateTask } from './task.service.js'
// import router from 'find-my-way'

// Task scheme
const Task = {
    type: 'object',
    properties: {
        id: {type: 'string', nullable: true, format: 'uuid'},
        title: {type: 'string'},
        order: {type: 'number'},
        description: {type: 'string'},
        userId: {type: 'string', nullable: true},
        boardId: {type: 'string', nullable: true},
        columnId: {type: 'string', nullable: true}
    }
}


// Options get all tasks
const getTasksOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: Task
            }
        }
    },
}

// Options get by ID Task
const getTaskOpts = {
    schema: {
        params:  {
            boardId: { type: 'string', nullable: true },
            taskId: { type: 'string', format: 'uuid' },
          },
        response: {
            200: Task
        }
        
    }
}

// Options create Task
const createTaskOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['title','order','description','userId'],
            properties: {
                title:   { type: 'string'},
                order: { type: 'number'},
                description: { type: 'string'},
                userId: { type: 'string', nullable: true},
                columnId: { type: 'string', nullable: true}
            },
        },
        response: {
            201: Task
        }
    }
}

// Options to delete one task
const deleteTaskOpts = {
    schema: {
        params:  {
            boardId: { type: 'string', format: 'uuid' },
            taskId: { type: 'string', format: 'uuid' },
          },
        response: {
            404: {
                type: 'object',
                properties: {
                    message: { type: 'string'}
                }
            },
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string'}
                }
            }
        }
    }
}

const updateTaskOpts = {
    schema: {
        params:  {
            boardId: { type: 'string', format: 'uuid' },
            taskId: { type: 'string', format: 'uuid' },
          },
        body: {
            type: 'object',
            required: ['title','order','description','userId', 'columnId'],
            properties: {
                title:   { type: 'string'},
                order: { type: 'number'},
                description: { type: 'string'},
                userId: { type: 'string', nullable: true},
                columnId: { type: 'string', nullable: true}
            },
        },
        response: {
            200: Task
        }
    }
}

const arrayEquals = (a, b) => Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((val, index) => val === b[index])

function taskRouter(fastify, options, done) {
    let tasks; let statusCode;
    // Get all tasks
    fastify.get('/boards/:boardId/tasks', getTasksOpts,  async (request, reply) => {
        tasks = await getTasks(request);
        statusCode = arrayEquals(tasks, []) ? 404 : 200
        reply
          .code(statusCode)
          .header('Content-Type', 'application/json; charset=utf-8')
          .send(tasks)

    } )

    fastify.get('/boards/:boardId/tasks/:taskId', getTaskOpts, async (request, reply) => {
        tasks = await getTask(request)
        statusCode = arrayEquals(tasks, []) ? 404 : 200
        reply
          .code(statusCode)
          .header('Content-Type', 'application/json; charset=utf-8')
          .send(tasks[0])

    } )

    fastify.post('/boards/:boardId/tasks', createTaskOpts, async (request, reply)=> {
        tasks = await addTask(request)
        reply
          .code(201)
          .header('Content-Type', 'application/json; charset=utf-8')
          .send(tasks)

    } )

    fastify.put('/boards/:boardId/tasks/:taskId', updateTaskOpts, async (request, reply)=> {
        tasks = await updateTask(request)
        reply
          .code(200)
          .header('Content-Type', 'application/json; charset=utf-8')
          .send(tasks)
    })

    fastify.delete('/boards/:boardId/tasks/:taskId', deleteTaskOpts, async (request, reply)=> {
        tasks = await deleteTask(request)
        statusCode = tasks ? 200 : 404
        const message = tasks ? { message: `Task has been removed.`} : { message : 'Not found'}
        reply
          .code(statusCode)
          .header('Content-Type', 'application/json; charset=utf-8')
          .send(message)

    })

    done()
}

export default  taskRouter