import  Task from './task.model.js'
import * as taskService from './task.memory.repository.js'

const getTasks = (boardId: string): Promise<Task[]> => taskService.getAll(boardId)
const addTask = (task: Task):Promise<Task> => taskService.create(task)
const getTask = (boardId: string, taskId: string):Promise<Task|undefined> => taskService.getById(boardId, taskId)
const updateTask = (task: Task):Promise<Task|undefined> => taskService.update(task)
const deleteTask = (boardId: string, taskId: string): Promise<boolean> => taskService.remove(boardId, taskId)

export { getTask, getTasks, addTask, updateTask, deleteTask }