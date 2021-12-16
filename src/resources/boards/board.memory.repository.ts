/**
 * This module is implementation of Repository Layer (Data access) of application for {@link Board} handling.
 * This module gets data from Data Layer (Database), handle them and send to {@link BoardService}
 * @module BoardRepository
 * @category Repository
 */
import * as db from '../../inmamoryDB.js'
import { Board } from './board.model.js'

/**
* Async function returns the list of all boards.
* @remarks This method has no arguments.
* @returns List of All Boards.
* @category Board
*/

const getAll = async (): Promise<Array<Board>> => db.getAllBoards()

/**
* Async function returns one Board by boardId.
* @param boardId -  id of the Board.
* @returns One Board or undefined.
* @category Board
*/

const getById = async (id: string): Promise<Board|undefined> => db.getBoardById(id)

/**
* Async function creates and returns one Board.
* @param board -  instance of class Board.
* @returns One just created Board.
* @category Board
*/

const create = async (board: Board): Promise<Board> => db.createBoard(board)

/**
* Async function updates one Board.
* @param board -  instance of class Board.
* @returns Updated Board or undefined, if board not found in database.
* @category Board
*/

const update = async (board: Board): Promise<Board|undefined> => db.updateBoard(board)

/**
* Async function removes one Board from database.
* @param id -  id of the Board
* @returns 'true' if board found in database and deleted, and 'false' otherwise.
* @category Board
*/

const remove = async (id: string): Promise<boolean> => db.removeBoard(id)

export { getAll, create, getById, update, remove }