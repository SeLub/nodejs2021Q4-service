import * as db from '../../inmamoryDB.js';
const getAll = async (boardId) => db.getAllTasks(boardId);
const getById = async (boardId, taskId) => db.getTaskById(boardId, taskId);
const create = async (task) => db.createTask(task);
const update = async (task) => db.updateTask(task);
const remove = async (boardId, taskId) => db.removeTask(boardId, taskId);
export { getAll, getById, create, update, remove };
//# sourceMappingURL=task.memory.repository.js.map