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
import fastifyStatic from "fastify-static"
import path from "path"
import { fileURLToPath } from 'url'
import UserRouter from "./resources/users/user.router.js"
import BoardRouter from "./resources/boards/board.router.js"
import TaskRouter from "./resources/tasks/task.router.js"
import {loginRoutes} from "./resources/logins/login.router.js"


/**
* Main server Router.
* Registes Task Router, User Router, Board Router
* @param fastify -  Fastify server instance. Returned by the core fastify() method.
* @category Server
*/

export default async function MainRouter(fastify: FastifyInstance) {
 
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  fastify.register(fastifyStatic, {
    root: path.join(__dirname, '../doc'),
    prefix: '/static'
  })

  // second plugin
fastify.register(fastifyStatic, {
  root: path.join(__dirname, '../docs'),
  prefix: '/docs',
  decorateReply: false // the reply decorator has been added by the first plugin registration
})

  /** Regiter Login Router
   * @param loginkRouter - module Logink Router
   */
   fastify.register(loginRoutes, { prefix: "/login" })

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
