import * as TaskService from './task.service.js';
import * as TaskOptions from './task.options.js';
export default async function TaskRouter(fastify) {
    const message404 = { message: 'Not found' };
    fastify.get("/boards/:boardId/tasks", TaskOptions.getTasksOpts, async (_request, reply) => {
        const { boardId } = _request.params;
        const tasks = await TaskService.getTasks(boardId);
        await reply.code(200).header('Content-Type', 'application/json charset=utf-8').send(tasks);
    });
    fastify.get("/boards/:boardId/tasks/:taskId", TaskOptions.getTaskOpts, async (_request, reply) => {
        const { boardId, taskId } = _request.params;
        const tasks = await TaskService.getTask(boardId, taskId);
        if (tasks) {
            await reply.code(200).header('Content-Type', 'application/json charset=utf-8').send(tasks);
        }
        else {
            await reply.code(404).send(message404);
        }
    });
    fastify.post("/boards/:boardId/tasks", TaskOptions.createTaskOpts, async (_request, reply) => {
        const newTask = { ..._request.body, boardId: _request.params.boardId, id: null };
        const task = await TaskService.addTask(newTask);
        await reply.code(201).header('Content-Type', 'application/json charset=utf-8').send(task);
    });
    fastify.put("/boards/:boardId/tasks/:taskId", TaskOptions.updateTaskOpts, async (_request, reply) => {
        const { boardId, taskId } = _request.params;
        const newTask = { ..._request.body, boardId, id: taskId };
        const updatedTask = await TaskService.updateTask(newTask);
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