import * as BoardService from './board.service.js';
import * as BoardOptions from './board.options.js';
export default async function BoardRouter(fastify) {
    const message404 = { message: 'Not found' };
    fastify.get("/", BoardOptions.getBoardsOpts, async (_request, reply) => {
        const boards = await BoardService.getAll();
        await reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send(boards);
    });
    fastify.get('/:boardId', BoardOptions.getBoardOpts, async (_request, reply) => {
        const { boardId } = _request.params;
        const item = await BoardService.getById(boardId);
        if (item) {
            await reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send(item);
        }
        else {
            await reply.code(404).send(message404);
        }
    });
    fastify.post('/', BoardOptions.createBoardOpts, async (_request, reply) => {
        const { title, columns } = _request.body;
        const newBoard = await BoardService.create({ id: null, title, columns });
        await reply.code(201).header('Content-Type', 'application/json; charset=utf-8').send(newBoard);
    });
    fastify.put('/:boardId', BoardOptions.updateBoardOpts, async (_request, reply) => {
        const { boardId } = _request.params;
        const { title, columns } = _request.body;
        const updatedBoard = await BoardService.update({ id: boardId, title, columns });
        if (updatedBoard) {
            await reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send(updatedBoard);
        }
        else {
            await reply.code(404).send(message404);
        }
    });
    fastify.delete('/:boardId', BoardOptions.deleteBoardOpts, async (_request, reply) => {
        const { boardId } = _request.params;
        const resault = await BoardService.remove(boardId);
        const statusCode = resault ? 200 : 404;
        const message = resault ? { message: 'Board has been deleted' } : message404;
        reply.code(statusCode).send(message);
    });
}
//# sourceMappingURL=board.router.js.map