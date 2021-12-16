import * as UserService from './user.service.js';
import * as UserOptions from './user.options.js';
import User from './user.model.js';
export default async function UserRouter(fastify) {
    const message404 = { message: 'Not found' };
    fastify.get("/", UserOptions.getUsersOpts, async (_request, reply) => {
        const users = await UserService.getUsers();
        await reply.code(200).send(users.map(el => User.toResponse(el)));
    });
    fastify.get('/:userId', UserOptions.getUserOpts, async (_request, reply) => {
        const resault = await UserService.getById(_request.params.userId);
        const statusCode = resault ? 200 : 404;
        const message = resault ? User.toResponse(resault) : message404;
        await reply.code(statusCode).header('Content-Type', 'application/json; charset=utf-8').send(message);
    });
    fastify.post('/', UserOptions.postUserOpts, async (_request, reply) => {
        const { name, login, password } = _request.body;
        const resault = await UserService.create({ id: null, name, login, password });
        await reply.code(201).header('Content-Type', 'application/json; charset=utf-8').send(User.toResponse(resault));
    });
    fastify.put('/:userId', UserOptions.updateUserOpts, async (_request, reply) => {
        const { name, login, password } = _request.body;
        const { userId } = _request.params;
        const resault = await UserService.update({ id: userId, name, login, password });
        const statusCode = resault ? 200 : 404;
        const meassge = resault || message404;
        await reply.code(statusCode).header('Content-Type', 'application/json; charset=utf-8').send(meassge);
    });
    fastify.delete('/:userId', UserOptions.deleteUserOpts, async (_request, reply) => {
        const { userId } = _request.params;
        const resault = await UserService.remove(userId);
        const statusCode = resault ? 200 : 404;
        const message = resault ? { message: 'User has been deleted' } : message404;
        reply.code(statusCode).send(message);
    });
}
//# sourceMappingURL=user.router.js.map