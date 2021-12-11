import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import * as usersService from './user.service.js'
import * as usersOptions from './user.options.js'
import {User} from './user.model.js'
import {idRequest, userBodyRequest, fullRequestUser} from '../../common/interfaces.js'


export default async function userRouter(fastify: FastifyInstance) {

  const message404 = { meassge: 'Not found'}

  // GET /users
  fastify.get("/",  usersOptions.getUsersOpts, async (
    _request: FastifyRequest, reply: FastifyReply )
  => {
    const users = await usersService.getUsers()
    reply.code(200).send(users.map(el => User.toResponse(el)))
  })

    // GET /users/:id
    fastify.get('/:id', usersOptions.getUserOpts, async (
      _request: FastifyRequest<idRequest>, reply: FastifyReply ) 
      => {
      const resault = await usersService.getById(_request.params.id)
      const statusCode = resault ? 200 : 404
      const message = resault ? User.toResponse(resault) : message404
      await reply
                .code(statusCode)
                .header('Content-Type', 'application/json; charset=utf-8')
                .send(message)
    })

   //  Create user POST /users
   fastify.post('/',  usersOptions.postUserOpts,  async (
    _request: FastifyRequest<userBodyRequest>, reply: FastifyReply ) 
    => {
    const { name, login, password} = _request.body
    const resault = await usersService.create(name, login, password)
    await reply
              .code(201)
              .header('Content-Type', 'application/json; charset=utf-8')
              .send(User.toResponse(resault))
  } )
    
    //  Update item PUT /users/:id
   fastify.put('/:id',  usersOptions.updateUserOpts,  async (
    _request: FastifyRequest<fullRequestUser>, reply: FastifyReply ) 
    => {
    const { name, login, password } = _request.body
    const {id} = _request.params
    const resault = await usersService.update(id, name, login, password)
    const statusCode = resault ? 200 : 404
    const meassge = resault || message404
    await reply
        .code(statusCode)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(meassge)

  } )
  //  Delete item DELETE users/:id
    fastify.delete('/:id', usersOptions.deleteUserOpts,  async (
      _request: FastifyRequest<idRequest>, reply: FastifyReply ) 
      => {
        const {id} = _request.params
        const resault = await usersService.remove(id)
        const statusCode = resault ? 200 : 404
        const message = resault ? {message: 'User has been deleted'} : message404
        reply.code(statusCode).send(message)
      })

}