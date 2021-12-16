/**
 * This module is implementation of Repository Layer (Data access) of application for {@link Task} handling.
 * This module gets data from Data Layer (Database), handle them and send to {@link TaskService}
 * @module TaskRepository
 * @category Repository
 */
import * as db from '../../inmamoryDB.js'
import Task from './task.model.js'

/**
* Returns the list of all tasks, belongs to exact board.
* @param boardId -  id of the Board
* @returns List of All Tasks.
* @category Task
*/

const getAll = async (boardId: string): Promise<Task[]> => db.getAllTasks(boardId)

/**
* Returns one task, belongs to exact board.
* @param boardId -  id of the Board
* @param taskId -  id of the Task
* @returns One task.
* @category Task
*/

const getById = async (boardId: string, taskId: string): Promise<Task|undefined> => db.getTaskById(boardId, taskId)

/**
* Creates and returns one task, beloning to exact board.
* @param task -  instance of class Board
* @returns One just created task.
* @category Task
*/

 const create = async (task: Task): Promise<Task> => db.createTask(task)

/**
* Updates and returns one task.
* @param taskIn -  instance of class Task
* @returns One just created task.
* @category Task
*/

const update = async (task: Task): Promise<Task|undefined> => db.updateTask(task)

/**
* Removes one task, belonings to exact board.
* @param boardId -  id of the Board
* @param taskId -  id of the Task
* @returns 'true' if task found in database and deleted, and 'false' otherwise.
* @category Task
*/

const remove = async (boardId: string, taskId:string): Promise<boolean> => db.removeTask(boardId, taskId)

export { getAll, getById, create, update, remove }