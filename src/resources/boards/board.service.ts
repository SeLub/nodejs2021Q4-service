
import { Board } from "./board.model"
import * as boardController from './board.repository.js'

const findById = (id: string) => boardController.findById(id)

const findAll = () => boardController.findAll()

const createBoard = (board:  Omit<Board, 'id'>) => boardController.createBoard(board)

const editBoard = (id: string, board: Board) => boardController.editBoard(id, board)

const deleteBoard = (id: string) =>  boardController.deleteBoard(id)
  
export { findById, findAll, createBoard, editBoard, deleteBoard }