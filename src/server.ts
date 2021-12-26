/**
 * Creates:
 *  - Fastify Server
 *  - import and register Swagger Plugin
 *  - import and register {@link MainRouter}
 * @module Server
 * @category Server
 */
 import fastify, { FastifyRequest, FastifyReply } from 'fastify'
 // import createFastify, { FastifyInstance, FastifyServerOptions, FastifyRequest, FastifyReply } from 'fastify' 
 import SwaggerPlugin from 'fastify-swagger'
 import { PORT } from './common/config.js'
 import MainRouter from './router.js'
 import { handleExit, handleUncaughtErrors } from './common/fatal.js';
 import {logger} from './logger.js'

 const FASTIFY_PORT = Number(PORT) || 3000

 const SwaggerOpt = {  exposeRoute: true,
  routePrefix:'/api-docs',
  swagger: {
      info: { title: 'REST service',
              description:'REST service using Fastify & TypeScript',
              version: '0.1.0'
            }
          }
}

const server = fastify({
  ignoreTrailingSlash: true,
  logger
})

server.addHook('preHandler', (req: FastifyRequest, reply: FastifyReply, done) => {
  console.log(reply)
  if (req.body) {
    req.log.info({ body: req.body }, 'parsed body')
  }
  done()
})


server.addHook("onRequest", (req:FastifyRequest, reply:FastifyReply, done) => {
  console.log(reply)
  
  req.log.info({  url: req.raw.url,
                  id: req.id,
                  params: req.params,
                  query: req.query }
                  , "received request")
  done()
})

server.addHook("onResponse", (req:FastifyRequest, reply:FastifyReply, done) => {
  req.log.info(
    {
      url: req.raw.url, // add url to response as well for simple correlating
      statusCode: reply.raw.statusCode,
    },
    "request completed"
  )
  done()
})

// server.register(fastifyRequestLogger)
/**
* Register Swagger Plugin 
* @param SwaggerPlugin - Swagger Plugin instance
* @param SwaggerOpt - Swagger JSON scheme Options
*/

server.register(SwaggerPlugin, SwaggerOpt)
/**
 * Register main Server Router 
 * @param MainRouter - main Server`s Router
 */

server.register(MainRouter)

const start = async () => {
      try{
        handleExit();
        handleUncaughtErrors();
 
        // Для проверки пункта 3 расскомментируйте здесь: 
        // throw Error('Oops!')

        // Для проверки пункта 4 расскомментируйте здесь: 
        // Promise.reject(Error('Oops!'))

          await server.listen(FASTIFY_PORT)
         // console.log(`🚀  Fastify server running on PORT:${FASTIFY_PORT}`)
      } catch(error){
          server.log.error(error)
          process.exit(1)
      }
    }
    
    start()

export default server 