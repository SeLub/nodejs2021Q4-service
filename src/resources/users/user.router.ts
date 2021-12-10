import { FastifyInstance, FastifyRequest, FastifyReply,  RequestGenericInterface } from "fastify";
import * as usersService from './user.service.js'
import * as usersOptions from './user.options.js'
import {User} from './user.model.js'

interface idRequest extends RequestGenericInterface {
  Params: { id: string };
}

interface bodyRequest extends RequestGenericInterface {
  Body: {   
    name: string,
    login: string,
    password: string, 
  };
}

interface fullRequest extends RequestGenericInterface {
  Body: {   
    name: string,
    login: string,
    password: string, 
  };
  Params: { id: string };
}


export default async function userRouter(fastify: FastifyInstance) {
  // GET /users
  fastify.get("/",  usersOptions.getUsersOpts, async function (
    _request: FastifyRequest,
    reply: FastifyReply
  ) {
    const users = await usersService.getUsers();
    reply.code(200).send(users.map(el => User.toResponse(el)));
  });

    // GET /users/:id
    fastify.get('/:id', usersOptions.getUserOpts, async function (
      _request: FastifyRequest<idRequest>, reply: FastifyReply ) 
      {
      const item = await usersService.getById(_request.params.id)
      if (item) {
        const statusCode = 200 
        reply
          .code(statusCode)
          .header('Content-Type', 'application/json; charset=utf-8')
          .send(item)

      } else {
        const statusCode = 404 
        reply
          .code(statusCode)
      }
      

    })

   //  Create item POST /users
   fastify.post('/',  usersOptions.postUserOpts,  async function (
    _request: FastifyRequest<bodyRequest>, reply: FastifyReply ) 
    {
    const name: string = _request.body.name
    const login: string = _request.body.login
    const password: string  = _request.body.password
    console.log(name, login, password)
    const item = await usersService.create(name, login, password)
    if (item){
      reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(item)
    } else {
      reply
      .code(404)
    }
  } )
    
    //  Update item PUT /users/:id
   fastify.put('/:id',  usersOptions.updateUserOpts,  async function (
    _request: FastifyRequest<fullRequest>, reply: FastifyReply ) 
    {
    const id: string = _request.params.id
    const name: string = _request.body.name
    const login: string = _request.body.login
    const password: string  = _request.body.password
    const item = await usersService.update(id, name, login, password)
    if (item){
      reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(item)
    } else {
      reply
      .code(404)
    }
  } )
  //  Delete item DELETE users/:id
    fastify.delete('/:id', usersOptions.deleteUserOpts,  async function (
      _request: FastifyRequest<idRequest>, reply: FastifyReply ) 
      {
        
        const id: string = _request?.params?.id
        const resault = await usersService.remove(id)
        let statusCode = resault ? 204 : 404
        reply
          .code(statusCode)
      })

}









//     done()
// }

