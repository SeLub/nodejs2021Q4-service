import userRouter from "./resources/users/user.router.js";
export default async function router(fastify) {
    fastify.register(userRouter, { prefix: "/users" });
}
//# sourceMappingURL=router.js.map