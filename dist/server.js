import fastify from "fastify";
import SwaggerPlugin from 'fastify-swagger';
import { PORT } from './common/config.js';
import MainRouter from './router.js';
const FASTIFY_PORT = Number(PORT) || 3000;
const server = fastify({ logger: true, });
const SwaggerOpt = { exposeRoute: true,
    routePrefix: '/api-docs',
    swagger: {
        info: { title: 'REST service',
            description: 'REST service using Fastify & TypeScript',
            version: '0.1.0'
        }
    }
};
server.register(SwaggerPlugin, SwaggerOpt);
server.register(MainRouter);
const start = async () => {
    try {
        await server.listen(FASTIFY_PORT);
    }
    catch (error) {
        server.log.error(error);
        process.exit(1);
    }
};
start();
export default server;
//# sourceMappingURL=server.js.map