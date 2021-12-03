import usersDatabase from './resources/users/Users.js'
import boardsDatabase from './resources/boards/Boards.js'
import tasksDatabase from './resources/tasks/Tasks.js'
import User from './resources/users/user.model.js';
import Board from './resources/boards/board.model.js';
import Task from './resources/tasks/task.model.js';

let item; let board;
let mockUsers = usersDatabase;
let mockBoards = boardsDatabase;
let mockTasks = tasksDatabase;

const arrayEquals = (a, b) => Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((val, index) => val === b[index])

/* ------------------ Users -----------------------------------*/

const getAllUsers = () =>mockUsers

const getUserById = (request) =>{
    const {id} = request.params
    item = mockUsers.find(el => el.id === id)
    return item
}
const createUser = (request) =>{
    const { name, login, password } = request.body
    const newUser = new User(name,login, password)
    mockUsers = [...mockUsers, newUser]
    delete newUser.password;
    return newUser
}

const updateUser = (req) =>{
    const {id} = req.params
    const { name, login, password } = req.body
    mockUsers = mockUsers.map(el => el.id === id ? { id, name, login, password } : el)
    item = mockUsers.find(el => el.id === id)
    return item

}

const removeUser = (request) =>{
    const {id} = request.params
    mockUsers = mockUsers.filter(el => el.id !== id)
    mockTasks.forEach((el) => {  const task = el; if (task.userId === id) { task.userId = null; } });
    return { message: `Item id:${id} has been removed.`}
}

/* ------------------ Boards -----------------------------------*/

const getAllBoards = () => mockBoards

const getBoardById = (request) =>{
    const {id} = request.params
    board = mockBoards.filter(el => el.id === id)
    if (arrayEquals(board, [])) { return undefined}  return board[0]     
}

const createBoard = (request) =>{
    const { title, columns } = request.body
    const newBoard = new Board({title, columns})
    mockBoards.push(newBoard)
    const justCreatedBoard = mockBoards.filter(el => el.id === newBoard.id.toString())
    return justCreatedBoard
}

const updateBoard = (req) =>{
    const {id} = req.params
    const { title, columns } = req.body
    mockBoards = mockBoards.map(el => el.id === id ? { id,  title, columns } : el)
    board = mockBoards.filter(el => el.id === id)
    return board

}

const removeBoard = (request) =>{
    const {id} = request.params
    if (id) {
        mockBoards = mockBoards.filter(el => el.id !== id)
        mockTasks = mockTasks.filter(el => el.boardId !== id)
        return { statusCode: 200, message: `Board id:${id} has been removed.`}
    } 
        return { statusCode: 404, message: `Board id:${id} not found.`}
    
}

/* ------------------ Tasks -----------------------------------*/

const getAllTasks = async (request) => {
    const { boardId } = request.params
    item = mockTasks.filter(el => el.boardId === boardId)
    return item
}

const getTaskById = async (request) => {
    const { boardId, taskId } = request.params
    mockTasks = mockTasks.filter(el => el !== null)
    item = mockTasks.filter(el => el.boardId === boardId && el.id === taskId)
    return item
}

const createTask = async (request) => {
    const { boardId } = request.params
    const { title, order, description, userId, columnId } = request.body
    const newTask = new Task({ title, order, description, userId, boardId, columnId })
    mockTasks.push(newTask)
    item = mockTasks.find(el => el.id === newTask.id)
    return item
}

const updateTask = async (request) => {
    const { boardId, taskId } = request.params
    const { title, order, description, userId, columnId } = request.body
    const newData = { title, order, description, userId, columnId }

    item = mockTasks.find(el => el.boardId === boardId && el.id === taskId)
    const newItem = {...item, ...newData }

    const index = mockTasks.indexOf(item)
    mockTasks[index] = newItem

    return mockTasks[index]
}

const removeTask = async (request) => {
    const { boardId, taskId } = request.params
    item = mockTasks.find(el => el.boardId === boardId && el.id === taskId)
    const index = mockTasks.indexOf(item)
    mockTasks.splice(index, 1)
    return item

}
/* ------------------ Export ----------------------------------*/

export {getAllUsers, getUserById, createUser, updateUser, removeUser, 
getAllBoards, getBoardById, createBoard, updateBoard, removeBoard, 
getAllTasks, getTaskById, createTask, updateTask, removeTask }