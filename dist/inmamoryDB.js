import usersDatabase from './resources/users/Users.js';
import boardsDatabase from './resources/boards/Boards.js';
import tasksDatabase from './resources/tasks/Tasks.js';
import { Board } from './resources/boards/board.model.js';
import User from './resources/users/user.model.js';
import Task from './resources/tasks/task.model.js';
let userDB = usersDatabase;
let boardDB = boardsDatabase;
let taskDB = tasksDatabase;
const getAllUsers = () => userDB;
const getUserById = (userId) => {
    const user = userDB.find(el => el.id === userId);
    return user;
};
const createUser = (user) => {
    const newUser = new User(user);
    userDB.push(newUser);
    return newUser;
};
const updateUser = (user) => {
    userDB = userDB.map(el => el.id === user.id ? { ...el, ...user } : el);
    const updatedUser = userDB.find(el => el.id === user.id);
    return updatedUser;
};
const removeUser = (userId) => {
    if (!userDB.some((el) => el.id === userId)) {
        return false;
    }
    userDB = userDB.filter(user => user.id !== userId);
    taskDB.forEach(task => { const currentTask = task; if (currentTask.userId === userId) {
        currentTask.userId = null;
    } });
    return true;
};
const getAllBoards = () => boardDB;
const getBoardById = (boardId) => {
    const resault = boardDB.find(board => board.id === boardId);
    return resault;
};
const createBoard = (board) => {
    const newBoard = new Board(board);
    boardDB.push(newBoard);
    return newBoard;
};
const updateBoard = (boardIn) => {
    const oldBoard = boardDB.find((board) => board.id === boardIn.id);
    if (!oldBoard) {
        return undefined;
    }
    const index = boardDB.indexOf(oldBoard);
    const newBoard = { ...oldBoard, ...boardIn };
    boardDB[index] = newBoard;
    return newBoard;
};
const removeBoard = (id) => {
    if (!boardDB.some(board => board.id === id)) {
        return false;
    }
    boardDB = boardDB.filter(board => board.id !== id);
    taskDB = taskDB.filter(el => el.boardId !== id);
    return true;
};
const getAllTasks = (boardId) => {
    const tasks = taskDB.filter(task => task.boardId === boardId);
    return tasks;
};
const getTaskById = (boardId, taskId) => {
    const result = taskDB.find(task => task.boardId === boardId && task.id === taskId);
    return result;
};
const createTask = (task) => {
    const newTask = new Task(task);
    taskDB.push(newTask);
    return newTask;
};
const updateTask = (taskIn) => {
    const oldTask = taskDB.find(task => task.boardId === taskIn.boardId && task.id === taskIn.id);
    if (!oldTask) {
        return undefined;
    }
    const index = taskDB.indexOf(oldTask);
    const newTask = { ...oldTask, ...taskIn };
    taskDB[index] = newTask;
    return newTask;
};
const removeTask = (boardId, taskId) => {
    if (!taskDB.some(task => task.boardId === boardId && task.id === taskId)) {
        return false;
    }
    taskDB = taskDB.filter(task => task.id !== taskId);
    return true;
};
export { getAllUsers, getUserById, createUser, updateUser, removeUser, getAllBoards, getBoardById, createBoard, updateBoard, removeBoard, getAllTasks, getTaskById, createTask, updateTask, removeTask };
//# sourceMappingURL=inmamoryDB.js.map