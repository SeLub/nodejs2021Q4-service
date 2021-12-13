import usersDatabase from './resources/users/Users.js'
import boardsDatabase from './resources/boards/Boards.js'
import tasksDatabase from './resources/tasks/Tasks.js'
import {Board } from './resources/boards/board.model.js'
import User from './resources/users/user.model.js'
import Task from './resources/tasks/task.model.js'

let userDB = usersDatabase
let boardDB = boardsDatabase
let  taskDB = tasksDatabase

/* ------------------ Users -----------------------------------*/

const getAllUsers = (): Array<User> => userDB

const getUserById = (userId: string): User | undefined => {
    const user = userDB.find(el => el.id === userId)
    return user
  }

const createUser = (user: User): User =>{
    const newUser = new User(user)
    userDB.push(newUser)
    return newUser
}

const updateUser = (user: User): User | undefined => {
  userDB = userDB.map(el => el.id === user.id ? { ...el,...user } : el)
  const updatedUser = userDB.find(el => el.id === user.id)
  return updatedUser
}

const removeUser = (userId: string): boolean => {
  if (!userDB.some((el) => el.id === userId)) { return false } 
  userDB = userDB.filter(user => user.id !== userId)
  taskDB.forEach(task => { const currentTask = task ; if (currentTask.userId === userId) { currentTask.userId = null }})
  return true
}

/* ------------------ Boards -----------------------------------*/

const getAllBoards = (): Array<Board> => boardDB

const getBoardById = (boardId: string): Board | undefined  => {
  const resault = boardDB.find(board => board.id === boardId)
  return resault
}
      
const createBoard = (board: Board): Board =>{
    const newBoard: Board = new Board(board)
    boardDB.push(newBoard)
    return newBoard
}

const updateBoard = (boardIn: Board): Board | undefined => {
  const oldBoard = boardDB.find((board) => board.id === boardIn.id)
  if (!oldBoard) {return undefined}
  const index = boardDB.indexOf(oldBoard)
  const newBoard = {...oldBoard, ...boardIn}
  boardDB[index] = newBoard
  return newBoard
}

const removeBoard = (id: string): boolean =>{
  if (!boardDB.some(board => board.id === id)) { return false }
  boardDB = boardDB.filter(board => board.id !== id)
  taskDB = taskDB.filter(el => el.boardId !== id)
  return true

}

/* ------------------ Tasks -----------------------------------*/

const getAllTasks = (boardId: string): Array<Task> => {
    const tasks = taskDB.filter(task => task.boardId === boardId)
  return tasks
}

const getTaskById = (boardId: string, taskId: string): Task|undefined => {
    const result = taskDB.find( task => task.boardId === boardId && task.id ===taskId)
  return result
} 

const createTask = (task: Task): Task => {
  const newTask = new Task(task)
  taskDB.push(newTask)
  return newTask
}

const updateTask = (taskIn: Task): Task|undefined => {
  const oldTask = taskDB.find( task => task.boardId === taskIn.boardId && task.id ===taskIn.id)
  if (!oldTask) {return undefined}
  const index = taskDB.indexOf(oldTask)
  const newTask = {...oldTask, ...taskIn}
  taskDB[index] = newTask
  return newTask
}

const removeTask = (boardId: string, taskId: string): boolean => {
  if (!taskDB.some(task => task.boardId === boardId && task.id ===taskId)) { return false }
  taskDB = taskDB.filter( task => task.id !==taskId)
  return true
}

export {getAllUsers, getUserById, createUser, updateUser, removeUser,
  getAllBoards, getBoardById, createBoard, updateBoard, removeBoard,
  getAllTasks, getTaskById, createTask, updateTask, removeTask }