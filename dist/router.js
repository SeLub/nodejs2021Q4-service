import fastifyStatic from "fastify-static";
import path from "path";
import { fileURLToPath } from 'url';
import UserRouter from "./resources/users/user.router.js";
import BoardRouter from "./resources/boards/board.router.js";
import TaskRouter from "./resources/tasks/task.router.js";
export default async function MainRouter(fastify) {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    fastify.register(fastifyStatic, {
        root: path.join(__dirname, '../doc'),
        prefix: '/static'
    });
    fastify.register(fastifyStatic, {
        root: path.join(__dirname, '../docs'),
        prefix: '/docs',
        decorateReply: false
    });
    fastify.register(TaskRouter);
    fastify.register(UserRouter, { prefix: "/users" });
    fastify.register(BoardRouter, { prefix: "/boards" });
}
//# sourceMappingURL=router.js.map