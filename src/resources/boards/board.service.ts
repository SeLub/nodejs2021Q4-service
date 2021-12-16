/**
 * This module is implementation of Service Layer (Business Logic) of application for {@link Board} handling
 * This module gets data from {@link BoardRepository}, handle them and send to {@link BoardRouter}
 * @module BoardService
 * @category Service
 */
import * as boardService from './board.memory.repository.js'
import  {Board} from './board.model.js'

/**
* Async function returns the list of all boards.
* @remarks This method has no arguments.
* @returns List of All Boards.
* @category Board
*/

const getAll = (): Promise<Board[]> => boardService.getAll()

/**
* Async function returns one Board by boardId.
* @param boardId -  id of the Board.
* @returns One Board or undefined.
* @category Board
*/

const create = (board: Board): Promise<Board> => boardService.create(board)

/**
* Async function creates and returns one Board.
* @param board -  instance of class Board.
* @returns One just created Board.
* @category Board
*/

const getById = (id: string): Promise<Board|undefined> => boardService.getById(id)

/**
* Async function updates one Board.
* @param board -  instance of class Board.
* @returns Updated Board or undefined, if board not found in database.
* @category Board
*/


const update = (board: Board): Promise<Board|undefined> => boardService.update(board)

/**
* Async function removes one Board from database.
* @param id -  id of the Board
* @returns 'true' if board found in database and deleted, and 'false' otherwise.
* @category Board
*/

const remove = (id: string): Promise<boolean> => boardService.remove(id)
export { getAll, create, getById, update, remove }