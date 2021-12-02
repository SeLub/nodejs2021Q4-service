import Fastify from 'fastify'
import { PORT } from './common/config.js';
import userRouter from './resources/users/user.router.js'

const fastify = Fastify({ logger: true })

// astify.register(require('fastify-swagger'), 
//   {   exposeRoute: true,
//       routePrefix:'/docs',
//       swagger: {
//           info: { title: 'fastify-api'},
//       },
//   })

fastify.register(userRouter)

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