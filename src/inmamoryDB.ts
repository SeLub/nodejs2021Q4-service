/**
 * This is a database of project.
 * Module imports database instancies (arrays) for User, Task and Board, implement CRUD operations and exports them.   
 * @module InMamory DB
 * @category Database
 */
import pkg from 'typeorm'
import { Board } from './resources/boards/board.model.js'
import User from './resources/users/user.model.js'
import Task from './resources/tasks/task.model.js'
import { User as UserEntity } from "./db/entities/User.js"
import { Board as BoardEntity } from "./db/entities/Board.js"
import { Task as TaskEntity } from "./db/entities/Task.js"

const { getRepository } = pkg

/* ------------------ Users -----------------------------------*/

/**
* Returns the list of all users.
* @remarks This method has no arguments.
* @returns List of All Users.
* @category User
*/

const getAllUsers = async (): Promise<Array<User>> => getRepository(UserEntity)
    .createQueryBuilder("user")
    .getMany()

/**
* Returns one User by userId.
* @param userId -  id of the User.
* @returns One User or undefined.
* @category User
*/

const getUserById = async (userId: string): Promise<User|undefined> => getRepository(UserEntity)
    .createQueryBuilder("user")
    .where("user.id = :id", { id: userId })
    .getOne()

/**
* Creates and returns one User.
* @param user -  instance of class User.
* @returns One just created User.
* @category User
*/

const createUser = async (user: User): Promise<User> =>{
  
  const newUser = new User(user)
  await getRepository(UserEntity)
    .createQueryBuilder("user")
    .insert()
    .into(UserEntity)
    .values(newUser)
    .execute()
  return newUser
}

/**
* Updates one User.
* @param user -  instance of class User.
* @returns Updated User or undefined, if user not found in database.
* @category User
*/

const updateUser = async (userIn: User): Promise<User|undefined> => {

  await getRepository(UserEntity)
    .createQueryBuilder("user")
    .update(UserEntity)
    .set({ name: userIn.name, login: userIn.login, password: userIn.password })
    .where("id = :id", { id: userIn.id })
    .execute()
  return getRepository(UserEntity)
    .createQueryBuilder("user")
    .where("user.id = :id", { id: userIn.id })
    .getOne()
}

/**
* Removes one User from database.
* @param userId -  id of the User
* @returns 'true' if user found in database and deleted, and 'false' otherwise.
* @category User
*/

const removeUser = async (userId: string): Promise<boolean> => {
  const resault = await getRepository(UserEntity)
    .createQueryBuilder("user")
    .delete()
    .from(UserEntity)
    .where("id = :id", { id: userId })
    .execute()

 return resault.affected !== 0
}

/* ------------------ Boards -----------------------------------*/

/**
* Returns the list of all boards.
* @remarks This method has no arguments.
* @returns List of All Boards.
* @category Board
*/

const getAllBoards = async (): Promise<Array<Board>> => getRepository(BoardEntity)
  .createQueryBuilder("board")
  .getMany()

/**
* Returns one Board by boardId.
* @param boardId -  id of the Board.
* @returns One Board or undefined.
* @category Board
*/

const getBoardById = async (boardId: string): Promise<Board|undefined> => getRepository(BoardEntity)
  .createQueryBuilder("board")
  .where("board.id = :id", { id: boardId })
  .getOne()
/**
* Creates and returns one Board.
* @param board -  instance of class Board.
* @returns One just created Board.
* @category Board
*/

const createBoard = async (board: Board): Promise<Board> =>{
    
  const newBoard: Board = new Board(board)
  await getRepository(BoardEntity)
      .createQueryBuilder("board")
      .insert()
      .into(BoardEntity)
      .values(newBoard)
      .execute()
  return newBoard
}

/**
* Updates one Board.
* @param board -  instance of class Board.
* @returns Updated Board or undefined, if board not found in database.
* @category Board
*/

const updateBoard = async (boardIn: Board): Promise<Board|undefined> => {

  await getRepository(BoardEntity)
    .createQueryBuilder("board")
    .update(BoardEntity)
    .set({ title: boardIn.title, columns: boardIn.columns })
    .where("id = :id", { id: boardIn.id })
    .execute()
  return getRepository(BoardEntity)
    .createQueryBuilder("board")
    .where("board.id = :id", { id: boardIn.id })
    .getOne()

}

/**
* Removes one Board from database.
* @param id -  id of the Board
* @returns 'true' if board found in database and deleted, and 'false' otherwise.
* @category Board
*/

const removeBoard = async (boardId: string): Promise<boolean> =>{

  const resault = await getRepository(BoardEntity)
    .createQueryBuilder("board")
    .delete()
    .from(BoardEntity)
    .where("id = :id", { id: boardId })
    .execute()
    return resault.affected !== 0

}

/* ------------------ Tasks -----------------------------------*/

/**
* Returns the list of all tasks, belongs to exact board.
* @param boardId -  id of the Board
* @returns List of All Tasks.
* @category Task
*/

const getAllTasks = async (boardId: string): Promise<Task[]> => getRepository(TaskEntity)
  .createQueryBuilder("task")
  .where("task.boardId = :boardId", { boardId })
  .getMany()

/**
* Returns one task, belongs to exact board.
* @param boardId -  id of the Board
* @param taskId -  id of the Task
* @returns One task.
* @category Task
*/

const getTaskById = async (boardId: string, taskId: string): Promise<Task|undefined> => getRepository(TaskEntity)
  .createQueryBuilder("task")
  .where("task.boardId = :boardId", { boardId, id: taskId })
  .getOne() 

/**
* Creates and returns one task, beloning to exact board.
* @param task -  instance of class Board
* @returns One just created task.
* @category Task
*/

const createTask = async (task: Task):Promise<Task> => {

  const newTask = new Task(task)
  await getRepository(TaskEntity)
      .createQueryBuilder("task")
      .insert()
      .into(TaskEntity)
      .values(newTask)
      .execute()
  return newTask
}

/**
* Updates and returns one task.
* @param taskIn -  instance of class Task
* @returns One just created task.
* @category Task
*/

const updateTask = async (taskIn: Task): Promise<Task|undefined> => {

  const oldTask: Task | undefined = await getRepository(TaskEntity)
  .createQueryBuilder("task")
  .where("task.boardId = :boardId", { boardId: taskIn.boardId, id: taskIn.id })
  .getOne()

  if (oldTask !== undefined) {

    const newTask: Task = {...oldTask, ...taskIn}
    await getRepository(TaskEntity)
    .createQueryBuilder("task")
    .update(TaskEntity)
    .set(newTask)
    .where("task.id = :id", { id: taskIn.id })
    .execute()
    
    const updatedTask: Task | undefined = await getRepository(TaskEntity)
    .createQueryBuilder("task")
    .where("task.id = :id", { id: taskIn.id })
    .getOne()

    return updatedTask

  }  return undefined

}

/**
* Removes one task, belonings to exact board.
* @param boardId -  id of the Board
* @param taskId -  id of the Task
* @returns 'true' if task found in database and deleted, and 'false' otherwise.
* @category Task
*/

const removeTask = async (boardId: string, taskId: string): Promise<boolean> => {

  const resault = await getRepository(TaskEntity)
    .createQueryBuilder("task")
    .delete()
    .from(TaskEntity)
    .where("id = :id", { id: taskId, boardId })
    .execute()

    return resault.affected !== 0
}

export { getAllUsers, getUserById, createUser, updateUser, removeUser,
  getAllBoards, getBoardById, createBoard, updateBoard, removeBoard,
  getAllTasks, getTaskById, createTask, updateTask, removeTask }