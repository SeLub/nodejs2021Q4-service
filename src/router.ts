import { FastifyInstance } from "fastify";
import userRouter from "./resources/users/user.router.js";
import boardRouter from "./resources/boards/board.router.js";
import taskRouter from "./resources/tasks/task.router.js";

export default async function router(fastify: FastifyInstance) {
  fastify.register(taskRouter);
  fastify.register(userRouter, { prefix: "/users" });
  fastify.register(boardRouter, { prefix: "/boards" });
}
