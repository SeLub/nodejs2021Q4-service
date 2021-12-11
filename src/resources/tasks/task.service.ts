import  Task from './task.model.js'
import * as taskService from './task.memory.repository.js'

const getTasks = (boardId: string): Promise<Task[]> => taskService.getAll(boardId)
const addTask = (task: Task):Promise<Task> => taskService.create(task)
const getTask = (boardId: string, taskId: string):Promise<Task|undefined> => taskService.getById(boardId, taskId)
const updateTask = (boardId: string, taskId: string, task: Task):Promise<Task|undefined> => taskService.update(boardId, taskId, task)
const deleteTask = (boardId: string, taskId: string): Promise<boolean> => taskService.remove(boardId, taskId)

export { getTask, getTasks, addTask, updateTask, deleteTask }


// console.log(getTasks("1414302d-aa90-4311-964c-de4d15246e9e"))

// let TaskObj = {
//       title: 'string',
//       order: 3,
//       description: 'string',
//       userId: null,
//       boardId: "1414302d-aa90-4311-964c-de4d15246e9e",
//       columnId:null,
//   }
  
//     console.log(addTask(TaskObj))
//     console.log('-----------')

//     console.log(getTasks("1414302d-aa90-4311-964c-de4d15246e9e"))