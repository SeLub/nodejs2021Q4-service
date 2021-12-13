import usersDatabase from './resources/users/Users.js'
import boardsDatabase from './resources/boards/Boards.js'
import tasksDatabase from './resources/tasks/Tasks.js'
import { User, UserInterface } from './resources/users/user.model.js'
import  {Board } from './resources/boards/board.model.js'
import Task from './resources/tasks/task.model.js'

let userDB = usersDatabase
let boardDB = boardsDatabase
let  taskDB = tasksDatabase

/* ------------------ Users -----------------------------------*/

/**
* Get all users
* @returns Array of User`s instancies.
* Exemple:
 */


const getAllUsers = (): Array<UserInterface> => userDB

const getUserById = (id: string): UserInterface | undefined =>{
    const user = userDB.find(el => el.id === id)
    return user
  }

const createUser = ( name: string, login: string, password: string ): UserInterface =>{
    const newUser = new User({name,login, password})
    userDB.push(newUser)
    return newUser
}

const updateUser = (id: string, name: string, login: string, password: string): UserInterface | undefined =>{
  userDB = userDB.map(el => el.id === id ? { id, name, login, password } : el)
  const updatedUser = userDB.find(el => el.id === id)
  return updatedUser
}

const removeUser = (id: string): boolean => {
  if (!userDB.some((el) => el.id === id)) 
  { return false } 
  userDB = userDB.filter(user => user.id !== id)
  taskDB.forEach( task => 
    { const currentTask = task ; 
      if (currentTask.userId === id) { currentTask.userId = null } 
    })
  return true
  
}

/* ------------------ Boards -----------------------------------*/

const getAllBoards = (): Array<Board> => boardDB

const getBoardById = (id: string): Board | undefined  => {
  const resault = boardDB.find(board => board.id === id)
  return resault
}
      
const createBoard = (board: Board): Board =>{
    const newBoard: Board = new Board(board)
    boardDB.push(newBoard)
    return newBoard
}

const updateBoard = (id: string, boardIn: Board): Board | undefined => {
  const oldBoard = boardDB.find((board) => board.id === id)
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

const updateTask = (boardId: string, taskId: string, taskIn: Task): Task|undefined => {
  const oldTask = taskDB.find( task => task.boardId === boardId && task.id ===taskId)
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

//   let TaskObj = {
//     title: 'string',
//     order: 3,
//     description: 'string',
//     userId: null,
//     boardId: "1414302d-aa90-4311-964c-de4d15246e9e",
//     columnId:null,
// }

//   console.log(createTask(TaskObj))


  // let brd = {
  //   id:'11',
  //   title: 'title', 
  //   columns: [{id:'3264', title:'UPDATED Title', order: 2}]}
    
  //     let  jcBoard = createBoard(brd)
  //   console.log('Create Test Board = ', jcBoard)
  //   let newId = jcBoard
  //   console.log('new Board = ', newId)
  //   console.log('++++++++++++++++++')
  //   let jcBoard2 = getAllBoards()
  //   console.log('All Boards = ', jcBoard2)
  //   console.log('++++++++++++++++++')
  //   let boardInsert = {
  //       id: '1414302d-aa90-4311-964c-de4d15246e9e',
  //       title: 'UPDATED Title PISS',
  //       columns: [{id:'null', title:'UPDATED Title', order: 2},{id:'null', title:'UPDATED=2 Title', order: 3}],
  //   }
  //   let jcBoard3 = updateBoard('1414302d-aa90-4311-964c-de4d15246e9e', boardInsert)
  //   console.log('Update Board = ', jcBoard3)
  //   console.log('++++++++++++++++++')
  //   jcBoard2 = getAllBoards()
  //   console.log('All Boards = ', jcBoard2)
  //   console.log('++++++++++++++++++')
  //   let jcBoard5 = getBoardById('1414302d-aa90-4311-964c-de4d15246e9e')
  //   console.log('Get Board by ID = ', jcBoard5)
  //   console.log('++++++++++++++++++')
  //   let rm = removeBoard('1414302d-aa90-4311-964c-de4d15246e9e')
  //   console.log('Deleted? ', rm ? 'yes': 'No')
  //   console.log('++++++++++++++++++')
  //   jcBoard2 = getAllBoards()
  //   console.log('All Boards = ', jcBoard2)

    // newReqUpdate = {
    //     params: { id : newId },
    //     body: {
    //         name:'Bill Gates',
    //         login:'LOGIN1',
    //         password:'PASS44',
    //         title: 'UPDATED Title',
    //         columns: [{id:'null', title:'UPDATED Title', order: 2},{id:'null', title:'UPDATED=2 Title', order: 3}],
    //         order: 4,
    //         description: 'Updated Descr',
    //         userId: 'UPDATED user ID',
    //         columnId: 'UPDATED columnID'
    //     }}

    //     console.log('Updated Test Board = ', updateBoard(newReqUpdate))