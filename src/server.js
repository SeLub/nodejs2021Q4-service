import Fastify from 'fastify'
import { PORT } from './common/config.js';
import userRouter from './resources/users/user.router.js'
import boardRouter from './resources/boards/board.router.js'
import taskRouter from './resources/tasks/task.router.js'

const fastify = Fastify({ logger: true,  ignoreTrailingSlash: true, caseSensitive: false })

// astify.register(require('fastify-swagger'), 
//   {   exposeRoute: true,
//       routePrefix:'/docs',
//       swagger: {
//           info: { title: 'fastify-api'},
//       },
//   })

fastify.register(userRouter)
fastify.register(boardRouter)
fastify.register(taskRouter)

fastify.get('/', (request, reply) => {
  reply.send({ hello: 'world' })
})

const start = async () => {
    try{
        await fastify.listen(PORT)

    } catch(error){

        fastify.log.error(error)
        
        process.exit(1)
    }
}

start()