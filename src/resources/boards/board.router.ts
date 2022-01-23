/**
 * This is the BOARD router to handle server requests. 
 * Depending on method (GET, POST, PUT, DELETE) and endpoint (/boards/:boardId) it retrives data from Service Layer and send response to user.  
 * - Request endpoints: /boards/:boardId
 * - Request methods: GET, POST, PUT, DELETE requests
 * - Part of the __Server Layer__
 * - Get data from: {@link BoardService}
 * - Get data from: {@link BoardOptions}
 * - Send Data to: {@link MainRouter}
 * 
 * @module BoardRouter
 * @category Server
 */

import { FastifyInstance, FastifyRequest, FastifyReply} from "fastify";
import * as BoardService from './board.service.js'
import * as BoardOptions from './board.options.js'
import {paramsInRequest, boardBodyRequest, fullRequestBoard} from '../../common/interfaces'

export default async function BoardRouter(fastify: FastifyInstance) {

  const message404 = { message: 'Not found'}
    
  // GET /boards - get all boards
  fastify.get("/",  BoardOptions.getBoardsOpts, async (
    _request: FastifyRequest, reply: FastifyReply ) => {
    const boards = await BoardService.findAll()
    await reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send(boards)
  });
    
  // GET /boards/:boardId - get the board by id
  fastify.get('/:boardId', BoardOptions.getBoardOpts, async (
      _request: FastifyRequest<paramsInRequest>, reply: FastifyReply ) => {
      const {boardId} = _request.params
      const item = await BoardService.findById(boardId)
      if (item) {
      await reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send(item)
      } else {
        await reply.code(404).send(message404)
      }
  })

  // POST /boards - create board
  fastify.post('/',  BoardOptions.createBoardOpts,  async (
    _request: FastifyRequest<boardBodyRequest>, reply: FastifyReply ) => {
      const boardReq = {..._request.body}
      const newBoard = await BoardService.createBoard(boardReq)
      await reply.code(201).header('Content-Type', 'application/json; charset=utf-8').send(newBoard)
  })
  // PUT /boards/:boardId - update board
  fastify.put('/:boardId', BoardOptions.updateBoardOpts,  async (
    _request: FastifyRequest<fullRequestBoard>, reply: FastifyReply ) => {
      const { boardId } = _request.params;
      const boardReq = {..._request.body, id: boardId};
      const updatedBoard = await BoardService.editBoard( boardId, boardReq)
      if (updatedBoard){
        await reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send(updatedBoard)
      } else {
        await reply.code(404).send(message404)
    }

})
  // DELETE /boards/:boardId - delete board
  fastify.delete('/:boardId', BoardOptions.deleteBoardOpts,  async (
    _request: FastifyRequest<paramsInRequest>, reply: FastifyReply ) => {
      const {boardId} = _request.params
      const resault: boolean = await BoardService.deleteBoard(boardId)
      const statusCode = resault ? 200 : 404
      const message = resault ? {message: 'Board has been deleted'} : message404
      reply.code(statusCode).send(message)
  })

}