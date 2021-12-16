/**
 * This is a database of project.
 * Module imports database instancies (arrays) for User, Task and Board, implement CRUD operations and exports them.   
 * @module InMamory DB
 * @category Database
 */
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

/**
* Returns the list of all users.
* @remarks This method has no arguments.
* @returns List of All Users.
* @category User
*/

const getAllUsers = (): Array<User> => userDB

/**
* Returns one User by userId.
* @param userId -  id of the User.
* @returns One User or undefined.
* @category User
*/

const getUserById = (userId: string): User | undefined => {
    const user = userDB.find(el => el.id === userId)
    return user
  }

/**
* Creates and returns one User.
* @param user -  instance of class User.
* @returns One just created User.
* @category User
*/

const createUser = (user: User): User =>{
    const newUser = new User(user)
    userDB.push(newUser)
    return newUser
}

/**
* Updates one User.
* @param user -  instance of class User.
* @returns Updated User or undefined, if user not found in database.
* @category User
*/

const updateUser = (user: User): User | undefined => {
  userDB = userDB.map(el => el.id === user.id ? { ...el,...user } : el)
  const updatedUser = userDB.find(el => el.id === user.id)
  return updatedUser
}

/**
* Removes one User from database.
* @param userId -  id of the User
* @returns 'true' if user found in database and deleted, and 'false' otherwise.
* @category User
*/

const removeUser = (userId: string): boolean => {
  if (!userDB.some((el) => el.id === userId)) { return false } 
  userDB = userDB.filter(user => user.id !== userId)
  taskDB.forEach(task => { const currentTask = task ; if (currentTask.userId === userId) { currentTask.userId = null }})
  return true
}

/* ------------------ Boards -----------------------------------*/

/**
* Returns the list of all boards.
* @remarks This method has no arguments.
* @returns List of All Boards.
* @category Board
*/

const getAllBoards = (): Array<Board> => boardDB

/**
* Returns one Board by boardId.
* @param boardId -  id of the Board.
* @returns One Board or undefined.
* @category Board
*/

const getBoardById = (boardId: string): Board | undefined  => {
  const resault = boardDB.find(board => board.id === boardId)
  return resault
}

/**
* Creates and returns one Board.
* @param board -  instance of class Board.
* @returns One just created Board.
* @category Board
*/

const createBoard = (board: Board): Board =>{
    const newBoard: Board = new Board(board)
    boardDB.push(newBoard)
    return newBoard
}

/**
* Updates one Board.
* @param board -  instance of class Board.
* @returns Updated Board or undefined, if board not found in database.
* @category Board
*/

const updateBoard = (boardIn: Board): Board | undefined => {
  const oldBoard = boardDB.find((board) => board.id === boardIn.id)
  if (!oldBoard) {return undefined}
  const index = boardDB.indexOf(oldBoard)
  const newBoard = {...oldBoard, ...boardIn}
  boardDB[index] = newBoard
  return newBoard
}

/**
* Removes one Board from database.
* @param id -  id of the Board
* @returns 'true' if board found in database and deleted, and 'false' otherwise.
* @category Board
*/

const removeBoard = (id: string): boolean =>{
  if (!boardDB.some(board => board.id === id)) { return false }
  boardDB = boardDB.filter(board => board.id !== id)
  taskDB = taskDB.filter(el => el.boardId !== id)
  return true

}

/* ------------------ Tasks -----------------------------------*/

/**
* Returns the list of all tasks, belongs to exact board.
* @param boardId -  id of the Board
* @returns List of All Tasks.
* @category Task
*/

const getAllTasks = (boardId: string): Array<Task> => {
    const tasks = taskDB.filter(task => task.boardId === boardId)
  return tasks
}

/**
* Returns one task, belongs to exact board.
* @param boardId -  id of the Board
* @param taskId -  id of the Task
* @returns One task.
* @category Task
*/

const getTaskById = (boardId: string, taskId: string): Task|undefined => {
    const result = taskDB.find( task => task.boardId === boardId && task.id ===taskId)
  return result
} 

/**
* Creates and returns one task, beloning to exact board.
* @param task -  instance of class Board
* @returns One just created task.
* @category Task
*/

const createTask = (task: Task): Task => {
  const newTask = new Task(task)
  taskDB.push(newTask)
  return newTask
}

/**
* Updates and returns one task.
* @param taskIn -  instance of class Task
* @returns One just created task.
* @category Task
*/

const updateTask = (taskIn: Task): Task|undefined => {
  const oldTask = taskDB.find( task => task.boardId === taskIn.boardId && task.id ===taskIn.id)
  if (!oldTask) {return undefined}
  const index = taskDB.indexOf(oldTask)
  const newTask = {...oldTask, ...taskIn}
  taskDB[index] = newTask
  return newTask
}

/**
* Removes one task, belonings to exact board.
* @param boardId -  id of the Board
* @param taskId -  id of the Task
* @returns 'true' if task found in database and deleted, and 'false' otherwise.
* @category Task
*/

const removeTask = (boardId: string, taskId: string): boolean => {
  if (!taskDB.some(task => task.boardId === boardId && task.id ===taskId)) { return false }
  taskDB = taskDB.filter( task => task.id !==taskId)
  return true
}

export { getAllUsers, getUserById, createUser, updateUser, removeUser,
  getAllBoards, getBoardById, createBoard, updateBoard, removeBoard,
  getAllTasks, getTaskById, createTask, updateTask, removeTask }