/**
 * This is the USER router to handle server requests. 
 * Depending on method (GET, POST, PUT, DELETE) and endpoint (/users/:userId) it retrives data from Service Layer and send response to user.  
 * - Request endpoints: /users/:userId
 * - Request methods: GET, POST, PUT, DELETE requests
 * - Part of the __Server Layer__
 * - Get data from: {@link UserService}
 * - Get data from: {@link UserOptions}
 * - Send Data to: {@link MainRouter}
 * 
 * @module UserRouter
 * @category Server
 */

import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import * as UserService from './user.service.js'
import * as UserOptions from './user.options.js'
import { toResponse} from './user.model.js'
import {paramsInRequest, userBodyRequest, fullRequestUser} from '../../common/interfaces'


export default async function UserRouter(fastify: FastifyInstance) {

  const message404 = { message: 'Not found'}

  // GET /users - get all users (remove password from response)
  fastify.get("/",  UserOptions.getUsersOpts, async (
    _request: FastifyRequest, reply: FastifyReply ) => {
    const users = await UserService.findAll()
    await reply.code(200).send(users.map(el => toResponse(el)))
  })

  // GET /users/:userId - get the user by id (remove password from response)
  fastify.get('/:userId', UserOptions.getUserOpts, async (
    _request: FastifyRequest<paramsInRequest>, reply: FastifyReply ) => {
    const resault = await UserService.findById(_request.params.userId)
    const statusCode = resault ? 200 : 404
    const message = resault ? toResponse(resault) : message404
    await reply.code(statusCode).header('Content-Type', 'application/json; charset=utf-8').send(message)
  })

   // POST /users - create user
  fastify.post('/',  UserOptions.postUserOpts,  async (
    _request: FastifyRequest<userBodyRequest>, reply: FastifyReply ) => {
    const userReq = {..._request.body}
    const resault = await UserService.createUser(userReq)
    await reply.code(201).header('Content-Type', 'application/json; charset=utf-8').send(toResponse(resault))
  })
    
  // PUT /users/:userId - update user
  fastify.put('/:userId',  UserOptions.updateUserOpts,  async (
    _request: FastifyRequest<fullRequestUser>, reply: FastifyReply ) => {
      const { userId } = _request.params;
      const userReq = {..._request.body, id: userId};
    const resault = await UserService.editUser(userId, userReq)
    const statusCode = resault ? 200 : 404
    const meassge = resault || message404
    await reply.code(statusCode).header('Content-Type', 'application/json; charset=utf-8').send(meassge)
  })

  // DELETE /users/:userId - delete user
    fastify.delete('/:userId', UserOptions.deleteUserOpts,  async (
      _request: FastifyRequest<paramsInRequest>, reply: FastifyReply ) => {
        const {userId} = _request.params
        const resault = await UserService.deleteUser(userId)
        const statusCode = resault ? 200 : 404
        const message = resault ? {message: 'User has been deleted'} : message404
        reply.code(statusCode).send(message)
      })

}