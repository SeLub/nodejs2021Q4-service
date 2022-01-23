import * as TaskService from './task.service.js';
import * as TaskOptions from './task.options.js';
export default async function TaskRouter(fastify) {
    const message404 = { message: 'Not found' };
    fastify.get("/boards/:boardId/tasks", TaskOptions.getTasksOpts, async (_request, reply) => {
        const { boardId } = _request.params;
        const tasks = await TaskService.findAll(boardId);
        await reply.code(200).header('Content-Type', 'application/json charset=utf-8').send(tasks);
    });
    fastify.get("/boards/:boardId/tasks/:taskId", TaskOptions.getTaskOpts, async (_request, reply) => {
        const { boardId, taskId } = _request.params;
        const tasks = await TaskService.findById(boardId, taskId);
        if (tasks) {
            await reply.code(200).header('Content-Type', 'application/json charset=utf-8').send(tasks);
        }
        else {
            await reply.code(404).send(message404);
        }
    });
    fastify.post("/boards/:boardId/tasks", TaskOptions.createTaskOpts, async (_request, reply) => {
        const { boardId } = _request.params;
        const taskReq = { ..._request.body, boardId, board: undefined };
        const task = await TaskService.createTask(boardId, taskReq);
        await reply.code(201).header('Content-Type', 'application/json charset=utf-8').send(task);
    });
    fastify.put("/boards/:boardId/tasks/:taskId", TaskOptions.updateTaskOpts, async (_request, reply) => {
        const { boardId, taskId } = _request.params;
        const newTask = {
            ..._request.body, boardId, id: taskId,
            board: undefined
        };
        const updatedTask = await TaskService.editTask(boardId, taskId, newTask);
        if (updatedTask) {
            await reply.code(200).header('Content-Type', 'application/json charset=utf-8').send(updatedTask);
        }
        else {
            await reply.code(404).send(message404);
        }
    });
    fastify.delete("/boards/:boardId/tasks/:taskId", TaskOptions.deleteTaskOpts, async (_request, reply) => {
        const { boardId, taskId } = _request.params;
        const resault = await TaskService.deleteTask(boardId, taskId);
        const statusCode = resault ? 200 : 404;
        const message = resault ? { message: 'Task has been deleted' } : message404;
        reply.code(statusCode).send(message);
    });
}
//# sourceMappingURL=task.router.js.map