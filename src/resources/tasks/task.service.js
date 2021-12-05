import * as taskCtr from './task.memory.repository.js';

const getTasks = (request) => taskCtr.getAll(request);
const addTask = (request) => taskCtr.create(request);
const getTask = (request) => taskCtr.getById(request);
const updateTask = (request) => taskCtr.update(request);
const deleteTask = (request) => taskCtr.remove(request);

export { getTask, getTasks, addTask, deleteTask, updateTask }
