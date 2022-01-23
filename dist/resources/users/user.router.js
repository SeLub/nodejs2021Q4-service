import * as UserService from './user.service.js';
import * as UserOptions from './user.options.js';
import { toResponse } from './user.model.js';
export default async function UserRouter(fastify) {
    const message404 = { message: 'Not found' };
    fastify.get("/", UserOptions.getUsersOpts, async (_request, reply) => {
        const users = await UserService.findAll();
        await reply.code(200).send(users.map(el => toResponse(el)));
    });
    fastify.get('/:userId', UserOptions.getUserOpts, async (_request, reply) => {
        const resault = await UserService.findById(_request.params.userId);
        const statusCode = resault ? 200 : 404;
        const message = resault ? toResponse(resault) : message404;
        await reply.code(statusCode).header('Content-Type', 'application/json; charset=utf-8').send(message);
    });
    fastify.post('/', UserOptions.postUserOpts, async (_request, reply) => {
        const userReq = { ..._request.body };
        const resault = await UserService.createUser(userReq);
        await reply.code(201).header('Content-Type', 'application/json; charset=utf-8').send(toResponse(resault));
    });
    fastify.put('/:userId', UserOptions.updateUserOpts, async (_request, reply) => {
        const { userId } = _request.params;
        const userReq = { ..._request.body, id: userId };
        const resault = await UserService.editUser(userId, userReq);
        const statusCode = resault ? 200 : 404;
        const meassge = resault || message404;
        await reply.code(statusCode).header('Content-Type', 'application/json; charset=utf-8').send(meassge);
    });
    fastify.delete('/:userId', UserOptions.deleteUserOpts, async (_request, reply) => {
        const { userId } = _request.params;
        const resault = await UserService.deleteUser(userId);
        const statusCode = resault ? 200 : 404;
        const message = resault ? { message: 'User has been deleted' } : message404;
        reply.code(statusCode).send(message);
    });
}
//# sourceMappingURL=user.router.js.map