/**
 * This is the TASK router to handle server requests. 
 * Depending on method (GET, POST, PUT, DELETE) and endpoint (/boards/:boardId/tasks/:taskId) it retrives data from Service Layer and send response to user.  
 * - Request endpoints: /boards/:boardId/tasks/:taskId
 * - Request methods: GET, POST, PUT, DELETE requests
 * - Part of the __Server Layer__
 * - Get data from: {@link TaskService}
 * - Get data from: {@link TaskOptions}
 * - Send Data to: {@link MainRouter}
 * 
 * @module TaskRouter
 * @category Server
 */

import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import * as TaskService from './task.service.js'
import * as TaskOptions from './task.options.js'
import {paramsInRequest, fullRequestTask} from '../../common/interfaces.js'
// import * as fs from 'fs';


/**
* Router for tasks.
* @param fastify -  Fastify server instance. Returned by the core fastify() method.
* @returns ??????
* @category Task
*/

export default async function TaskRouter(fastify: FastifyInstance) {

  const message404 = { message: 'Not found'}

/**
* Router to get all tasks.
* GET boards/:boardId/tasks - get all tasks
* @param -  endpoint.
* @param - Validation Scheme Options
* @param - callback function
* @returns ??????
* @category Task
*/

    // GET /docs - get docs
    // fastify.get('/docs' ,function (_request, reply) {
    //   const bufferIndexHtml = fs.readFileSync('docs/index.html')
    //   reply.code(200).header('Content-Type', 'text/html charset=utf-8').send(bufferIndexHtml)
    // })


    // GET boards/:boardId/tasks - get all tasks
    fastify.get("/boards/:boardId/tasks",  TaskOptions.getTasksOpts, async (
      _request: FastifyRequest<paramsInRequest>, reply: FastifyReply ) => {
      const {boardId} = _request.params
      const tasks = await TaskService.getTasks(boardId)
      await reply.code(200).header('Content-Type', 'application/json charset=utf-8').send(tasks)
    })

    // GET boards/:boardId/tasks/:taskId - get the task by id
    fastify.get("/boards/:boardId/tasks/:taskId",  TaskOptions.getTaskOpts, async (
          _request: FastifyRequest<paramsInRequest>, reply: FastifyReply ) => {
          const { boardId, taskId } =  _request.params
          const tasks = await TaskService.getTask(boardId, taskId)
          if (tasks) {
            await reply.code(200).header('Content-Type', 'application/json charset=utf-8').send(tasks)
          } else {
            await reply.code(404).send(message404)
          }
        })

    // POST boards/:boardId/tasks - create task
    fastify.post("/boards/:boardId/tasks",  TaskOptions.createTaskOpts, async (
          _request: FastifyRequest<fullRequestTask>, reply: FastifyReply ) => {
          const newTask = {..._request.body, boardId: _request.params.boardId, id:null}
          const task = await TaskService.addTask(newTask)
          await reply.code(201).header('Content-Type', 'application/json charset=utf-8').send(task)
        })

    // PUT boards/:boardId/tasks/:taskId - update task
    fastify.put("/boards/:boardId/tasks/:taskId",  TaskOptions.updateTaskOpts, async (
      _request: FastifyRequest<fullRequestTask>, reply: FastifyReply ) => {
      const { boardId, taskId } =  _request.params
      const newTask = {..._request.body, boardId, id:taskId}
      const updatedTask = await TaskService.updateTask(newTask)
      if (updatedTask) {
        await reply.code(200).header('Content-Type', 'application/json charset=utf-8').send(updatedTask)
      } else {
        await reply.code(404).send(message404)
      }
    })

    // DELETE boards/:boardId/tasks/:taskId - delete task
    fastify.delete("/boards/:boardId/tasks/:taskId",  TaskOptions.deleteTaskOpts, async (
      _request: FastifyRequest<paramsInRequest>, reply: FastifyReply ) => {
      const {boardId, taskId} = _request.params
      const resault: boolean = await TaskService.deleteTask(boardId, taskId)
      const statusCode = resault ? 200 : 404
      const message = resault ? {message: 'Task has been deleted'} : message404
      reply.code(statusCode).send(message)
    })

}