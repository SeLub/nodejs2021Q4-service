import * as taskController from './task.repository.js';
import { Task } from './task.model.js';


const findById = (boardId: string, taskId: string) => taskController.findById(boardId, taskId);

const findAll = (boardId: string) => taskController.findAll(boardId);

const createTask = (boardId: string, task: Omit<Task, 'id'>) => taskController.createTask(boardId, task);

const editTask = (boardId: string, taskId: string, task: Task) =>
taskController.editTask(boardId, taskId, task);
  
const deleteTask = (boardId: string, taskId: string) =>
taskController.deleteTask(boardId, taskId);
 
export {
  findById,
  findAll,
  createTask,
  editTask,
  deleteTask,
};