/**
 * This is the BOARD router to handle server requests. 
 * Depending on method (GET, POST, PUT, DELETE) and endpoint (/boards/:boardId) it retrives data from Service Layer and send response to user.  
 * - Request endpoints: /boards/:boardId
 * - Request methods: GET, POST, PUT, DELETE requests
 * - Part of the __Server Layer__
 * - Get data from: {@link BoardService}
 * - Send Data to: {@link MainRouter}
 * 
 * @module BoardRouter
 * @category Server
 */

import { FastifyInstance, FastifyRequest, FastifyReply} from "fastify";
import * as BoardService from './board.service.js'
import * as boardsOptions from './board.options.js'
import {paramsInRequest, boardBodyRequest, fullRequestBoard} from '../../common/interfaces.js'

export default async function BoardRouter(fastify: FastifyInstance) {

  const message404 = { message: 'Not found'}
    
  // GET /boards - get all boards
  fastify.get("/",  boardsOptions.getBoardsOpts, async (
    _request: FastifyRequest, reply: FastifyReply ) => {
    const boards = await BoardService.getAll()
    await reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send(boards)
  });
    
  // GET /boards/:boardId - get the board by id
  fastify.get('/:boardId', boardsOptions.getBoardOpts, async (
      _request: FastifyRequest<paramsInRequest>, reply: FastifyReply ) => {
      const {boardId} = _request.params
      const item = await BoardService.getById(boardId)
      if (item) {
      await reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send(item)
      } else {
        await reply.code(404).send(message404)
      }
  })

  // POST /boards - create board
  fastify.post('/',  boardsOptions.createBoardOpts,  async (
    _request: FastifyRequest<boardBodyRequest>, reply: FastifyReply ) => {
      const { title, columns } = _request.body
      const newBoard = await BoardService.create({ id:null, title, columns })
      await reply.code(201).header('Content-Type', 'application/json; charset=utf-8').send(newBoard)
  })
  // PUT /boards/:boardId - update board
  fastify.put('/:boardId', boardsOptions.updateBoardOpts,  async (
    _request: FastifyRequest<fullRequestBoard>, reply: FastifyReply ) => {
      const {boardId} = _request.params
      const { title, columns } = _request.body
      const updatedBoard = await BoardService.update({id:boardId, title, columns})
      if (updatedBoard){
        await reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send(updatedBoard)
      } else {
        await reply.code(404).send(message404)
    }

})
  // DELETE /boards/:boardId - delete board
  fastify.delete('/:boardId', boardsOptions.deleteBoardOpts,  async (
    _request: FastifyRequest<paramsInRequest>, reply: FastifyReply ) => {
      const {boardId} = _request.params
      const resault: boolean = await BoardService.remove(boardId)
      const statusCode = resault ? 200 : 404
      const message = resault ? {message: 'Board has been deleted'} : message404
      reply.code(statusCode).send(message)
  })

}