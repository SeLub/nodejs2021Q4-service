import { FastifyInstance } from "fastify";
import userRouter from "./resources/users/user.router.js";

export default async function router(fastify: FastifyInstance) {
  fastify.register(userRouter, { prefix: "/users" });
}
