/**
 * Main Server Router imports:
 *  - {@link UserRouter}
 *  - {@link BoardRouter}
 *  - {@link TaskRouter}
 * 
 * and register them in Server.
 * 
 * @module MainRouter
 * @category Server
 */

import { FastifyInstance } from "fastify"
import UserRouter from "./resources/users/user.router.js"
import BoardRouter from "./resources/boards/board.router.js"
import TaskRouter from "./resources/tasks/task.router.js"

/**
* Main server Router.
* Registes Task Router, User Router, Board Router
* @param fastify -  Fastify server instance. Returned by the core fastify() method.
* @category Server
*/

export default async function MainRouter(fastify: FastifyInstance) {
  /** Regiter Task Router
   * @param taskRouter - module Task Router
   */
  fastify.register(TaskRouter)
  /** Regiter User Router 
   * @param userRouter - module User Router
  */
  fastify.register(UserRouter, { prefix: "/users" })
  /** Regiter Board Router 
   * @param boardRouter - module Board Router
  */
  fastify.register(BoardRouter, { prefix: "/boards" })
}
