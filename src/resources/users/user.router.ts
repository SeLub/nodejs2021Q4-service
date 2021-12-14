import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import * as usersService from './user.service.js'
import * as usersOptions from './user.options.js'
import User from './user.model.js'
import {paramsInRequest, userBodyRequest, fullRequestUser} from '../../common/interfaces.js'


export default async function userRouter(fastify: FastifyInstance) {

  const message404 = { message: 'Not found'}

  // GET /users - get all users (remove password from response)
  fastify.get("/",  usersOptions.getUsersOpts, async (
    _request: FastifyRequest, reply: FastifyReply ) => {
    const users = await usersService.getUsers()
    await reply.code(200).send(users.map(el => User.toResponse(el)))
  })

  // GET /users/:userId - get the user by id (remove password from response)
  fastify.get('/:userId', usersOptions.getUserOpts, async (
    _request: FastifyRequest<paramsInRequest>, reply: FastifyReply ) => {
    const resault = await usersService.getById(_request.params.userId)
    const statusCode = resault ? 200 : 404
    const message = resault ? User.toResponse(resault) : message404
    await reply.code(statusCode).header('Content-Type', 'application/json; charset=utf-8').send(message)
  })

   // POST /users - create user
  fastify.post('/',  usersOptions.postUserOpts,  async (
    _request: FastifyRequest<userBodyRequest>, reply: FastifyReply ) => {
    const { name, login, password} = _request.body
    const resault = await usersService.create({id:null, name, login, password})
    await reply.code(201).header('Content-Type', 'application/json; charset=utf-8').send(User.toResponse(resault))
  })
    
  // PUT /users/:userId - update user
  fastify.put('/:userId',  usersOptions.updateUserOpts,  async (
    _request: FastifyRequest<fullRequestUser>, reply: FastifyReply ) => {
    const { name, login, password } = _request.body
    const {userId} = _request.params
    const resault = await usersService.update({id:userId, name, login, password})
    const statusCode = resault ? 200 : 404
    const meassge = resault || message404
    await reply.code(statusCode).header('Content-Type', 'application/json; charset=utf-8').send(meassge)
  })

  // DELETE /users/:userId - delete user
    fastify.delete('/:userId', usersOptions.deleteUserOpts,  async (
      _request: FastifyRequest<paramsInRequest>, reply: FastifyReply ) => {
        const {userId} = _request.params
        const resault = await usersService.remove(userId)
        const statusCode = resault ? 200 : 404
        const message = resault ? {message: 'User has been deleted'} : message404
        reply.code(statusCode).send(message)
      })

}