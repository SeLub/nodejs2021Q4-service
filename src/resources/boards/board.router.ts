import { FastifyInstance, FastifyRequest, FastifyReply} from "fastify";
import * as boardsService from './board.service.js'
import * as boardsOptions from './board.options.js'
// import {Board} from './board.model.js'
import {idRequest, boardBodyRequest, fullRequestBoard} from '../../common/interfaces.js'

export default async function boardRouter(fastify: FastifyInstance) {

  const message404 = { meassge: 'Not found'}
    
    // Get all boards GET /boards
  fastify.get("/",  boardsOptions.getBoardsOpts, async (
    _request: FastifyRequest, reply: FastifyReply ) => {
    const boards = await boardsService.getAll()
    reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(boards);
  });
    
    // Get single board
    fastify.get('/:id', boardsOptions.getBoardOpts, async (
      _request: FastifyRequest<idRequest>, reply: FastifyReply ) => {
      const {id} = _request.params
      const item = await boardsService.getById(id)
      if (item) {
      reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(item)
      } else {
        reply
        .code(404)
        .send(message404)
      }
  })

   //  Create item POST /boards
   fastify.post('/',  boardsOptions.createBoardOpts,  async (
    _request: FastifyRequest<boardBodyRequest>, reply: FastifyReply ) => {
      const { title, columns } = _request.body
      const newBoard = await boardsService.create({ title, columns })
      await reply
        .code(201)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(newBoard)
  })
   //  Update board PUT /boards
  fastify.put('/:id', boardsOptions.updateBoardOpts,  async (
    _request: FastifyRequest<fullRequestBoard>, reply: FastifyReply ) => {
      const {id} = _request.params
      const { title, columns } = _request.body
      const updatedBoard = await boardsService.update(id, {title, columns})
      if (updatedBoard){
        reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(updatedBoard)
      } else {
        reply
        .code(404)
        .send(message404)
    }

})

fastify.delete('/:id', boardsOptions.deleteBoardOpts,  async (
  _request: FastifyRequest<idRequest>, reply: FastifyReply ) => {
    const {id} = _request.params
    const resault: boolean = await boardsService.remove(id)

    const statusCode = resault ? 200 : 404
    const message = resault ? {message: 'Board has been deleted'} : message404
    reply.code(statusCode).send(message)
  })


}