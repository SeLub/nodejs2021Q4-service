import fastify from "fastify"
import SwaggerPlugin from 'fastify-swagger'
import router from './router.js'

const server = fastify({ logger: true, })

server.register(SwaggerPlugin, 
      {   exposeRoute: true,
          routePrefix:'/api-docs',
          swagger: {
              info: {   title: 'REST service',
                        description:'REST service using Fastify & TypeScript',
                        version: '0.1.0'
                  }
          }
      })

// Middleware: Router
server.register(router)


export default server