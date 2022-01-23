import * as taskController from './task.repository.js';
const findById = (boardId, taskId) => taskController.findById(boardId, taskId);
const findAll = (boardId) => taskController.findAll(boardId);
const createTask = (boardId, task) => taskController.createTask(boardId, task);
const editTask = (boardId, taskId, task) => taskController.editTask(boardId, taskId, task);
const deleteTask = (boardId, taskId) => taskController.deleteTask(boardId, taskId);
export { findById, findAll, createTask, editTask, deleteTask, };
//# sourceMappingURL=task.service.js.map