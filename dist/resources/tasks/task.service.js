import * as taskService from './task.memory.repository.js';
const getTasks = (boardId) => taskService.getAll(boardId);
const addTask = (task) => taskService.create(task);
const getTask = (boardId, taskId) => taskService.getById(boardId, taskId);
const updateTask = (task) => taskService.update(task);
const deleteTask = (boardId, taskId) => taskService.remove(boardId, taskId);
export { getTask, getTasks, addTask, updateTask, deleteTask };
//# sourceMappingURL=task.service.js.map