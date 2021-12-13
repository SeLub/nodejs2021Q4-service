import * as db from '../../inmamoryDB.js'
import Task from './task.model.js';

const getAll = async (boardId: string): Promise<Task[]> => db.getAllTasks(boardId);
const getById = async (boardId: string, taskId: string): Promise<Task|undefined> => db.getTaskById(boardId, taskId);
 const create = async (task: Task): Promise<Task> => db.createTask(task);
const update = async (task: Task): Promise<Task|undefined> => db.updateTask(task);
const remove = async (boardId: string, taskId:string): Promise<boolean> => db.removeTask(boardId, taskId);

export { getAll, getById, create, update, remove };