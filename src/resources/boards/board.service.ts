import * as boardService from './board.memory.repository.js'
import  {Board} from './board.model.js'

const getAll = (): Promise<Board[]> => boardService.getAll()
const create = (board: Board): Promise<Board> => boardService.create(board)
const getById = (id: string): Promise<Board|undefined> => boardService.getById(id)
const update = (id: string, board: Board): Promise<Board|undefined> => boardService.update(id, board)
const remove = (id: string): Promise<boolean> => boardService.remove(id)
export { getAll, create, getById, update, remove }