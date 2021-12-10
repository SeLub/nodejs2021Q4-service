import fastify from "fastify"
import router from './router.js'

const server = fastify({ logger: true, })

// Middleware: Router
server.register(router)

export default server