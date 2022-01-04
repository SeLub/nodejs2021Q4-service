import fastify from 'fastify';
import SwaggerPlugin from 'fastify-swagger';
import { PORT } from './common/config.js';
import MainRouter from './router.js';
import { handleExit, handleUncaughtErrors } from './common/fatal.js';
import { logger } from './logger.js';
const FASTIFY_PORT = Number(PORT) || 3000;
const SwaggerOpt = { exposeRoute: true,
    routePrefix: '/api-docs',
    swagger: {
        info: { title: 'REST service',
            description: 'REST service using Fastify & TypeScript',
            version: '0.1.0'
        }
    }
};
const server = fastify({
    ignoreTrailingSlash: true,
    logger
});
server.addHook('preHandler', (req, reply, done) => {
    console.log(reply);
    if (req.body) {
        req.log.info({ body: req.body }, 'parsed body');
    }
    done();
});
server.addHook("onRequest", (req, reply, done) => {
    console.log(reply);
    req.log.info({ url: req.raw.url,
        id: req.id,
        params: req.params,
        query: req.query }, "received request");
    done();
});
server.addHook("onResponse", (req, reply, done) => {
    req.log.info({
        url: req.raw.url,
        statusCode: reply.raw.statusCode,
    }, "request completed");
    done();
});
server.register(SwaggerPlugin, SwaggerOpt);
server.register(MainRouter);
const start = async () => {
    try {
        handleExit();
        handleUncaughtErrors();
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