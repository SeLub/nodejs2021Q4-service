import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import * as tasksService from './task.service.js'
import * as tasksOptions from './task.options.js'
// import Task from './task.model.js'
import {paramsRequestTask, fullRequestTask} from '../../common/interfaces.js'

export default async function taskRouter(fastify: FastifyInstance) {

    const message404 = { meassge: 'Not found'}
  
    // GET boards/:boardId/tasks - get all tasks
    fastify.get("/boards/:boardId/tasks",  tasksOptions.getTasksOpts, async (
      _request: FastifyRequest<paramsRequestTask>, reply: FastifyReply )
    => {
      const {boardId} = _request.params
      const tasks = await tasksService.getTasks(boardId)
      reply
          .code(200)
          .header('Content-Type', 'application/json charset=utf-8')
          .send(tasks)
    })

    // GET boards/:boardId/tasks/:taskId - get the task by id
    fastify.get("/boards/:boardId/tasks/:taskId",  tasksOptions.getTaskOpts, async (
          _request: FastifyRequest<paramsRequestTask>, reply: FastifyReply )
        => {
          const {boardId} = _request.params
          const {taskId} = _request.params
          const tasks = await tasksService.getTask(boardId, taskId)
          if (tasks) {
          reply
              .code(200)
              .header('Content-Type', 'application/json charset=utf-8')
              .send(tasks)
          } else {
            reply
            .code(404)
            .send(message404)
          }
        })

    // POST boards/:boardId/tasks - create task
    fastify.post("/boards/:boardId/tasks",  tasksOptions.createTaskOpts, async (
          _request: FastifyRequest<fullRequestTask>, reply: FastifyReply )
        => {
          const newTask = {..._request.body, boardId: _request.params.boardId}
          const task = await tasksService.addTask(newTask)
          await reply
                  .code(201)
                  .header('Content-Type', 'application/json charset=utf-8')
                  .send(task)

        })

    // PUT boards/:boardId/tasks/:taskId - update task
    fastify.put("/boards/:boardId/tasks/:taskId",  tasksOptions.updateTaskOpts, async (
      _request: FastifyRequest<fullRequestTask>, reply: FastifyReply )
    => {
      const { boardId, taskId } =  _request.params
      const newTask = {..._request.body, boardId}
      const updatedTask = await tasksService.updateTask(boardId, taskId, newTask)
      if (updatedTask) {
      reply
          .code(200)
          .header('Content-Type', 'application/json charset=utf-8')
          .send(updatedTask)
      } else {
        reply
        .code(404)
        .send(message404)
      }
    })

    // DELETE boards/:boardId/tasks/:taskId - delete task
    fastify.delete("/boards/:boardId/tasks/:taskId",  tasksOptions.deleteTaskOpts, async (
      _request: FastifyRequest<paramsRequestTask>,
      reply: FastifyReply
    ) => {
      const {boardId} = _request.params
      const {taskId} = _request.params

      const resault: boolean = await tasksService.deleteTask(boardId, taskId)
      const statusCode = resault ? 200 : 404
      const message = resault ? {message: 'Task has been deleted'} : message404
      reply.code(statusCode).send(message)

    })






}