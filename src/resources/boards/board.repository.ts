import pkg from 'typeorm';
import { Board } from './board.model.js'

const { getRepository } = pkg;

const findById = async (id: string) => {
  const repository = await getRepository(Board)
  const board = repository.findOne({id})
  if (!board) {
    return false
  }
  return board
}

const findAll = async () => {
  const repository = await getRepository(Board)

  return repository.find()    
}

const createBoard = async (board: Omit<Board, 'id'>) => {
  const repository = await getRepository(Board)
  const newBoard = repository.create({...board})
  await repository.save(newBoard)
  return newBoard
}

const editBoard = async (id: string, board: Board) => {
  const repository = await getRepository(Board)
  const boardToEdit = await repository.findOne({id})
  if (!boardToEdit) {
    return false
  }
  const _board = { ...boardToEdit, ...board }
  await repository.save(_board)
  return _board
}

const deleteBoard = async (id: string) => {
  const repository = await getRepository(Board)
  const delBoard = await repository.findOne({id})
  if (!delBoard) {
    return false
  }
  await repository.remove(delBoard)
  return true
} 

export { 
findById,
findAll,
createBoard,
editBoard,
deleteBoard
}