/**
 * This module is implementation of Service Layer (Business Logic) of application for {@link Task} handling
 * This module gets data from {@link TaskRepository}, handle them and send to {@link TaskRouter}
 * @module TaskService
 * @category Service
*/
import  Task from './task.model.js'
import * as taskService from './task.memory.repository.js'

/**
* Returns the list of all tasks, belongs to exact board.
* @param boardId -  id of the Board
* @returns List of All Tasks.
* @category Task
*/

const getTasks = (boardId: string): Promise<Task[]> => taskService.getAll(boardId)

/**
* Creates and returns one task, beloning to exact board.
* @param task -  instance of class Task
* @returns One just created task.
* @category Task
*/

const addTask = (task: Task):Promise<Task> => taskService.create(task)

/**
* Returns one task, belongs to exact board.
* @param boardId -  id of the Board
* @param taskId -  id of the Task
* @returns One task.
* @category Task
*/

const getTask = (boardId: string, taskId: string):Promise<Task|undefined> => taskService.getById(boardId, taskId)

/**
* Updates and returns one task.
* @param taskIn -  instance of class Task
* @returns One just created task.
* @category Task
*/

const updateTask = (task: Task):Promise<Task|undefined> => taskService.update(task)

/**
* Removes one task, belonings to exact board.
* @param boardId -  id of the Board
* @param taskId -  id of the Task
* @returns 'true' if task found in database and deleted, and 'false' otherwise.
* @category Task
*/

const deleteTask = (boardId: string, taskId: string): Promise<boolean> => taskService.remove(boardId, taskId)

export { getTask, getTasks, addTask, updateTask, deleteTask }