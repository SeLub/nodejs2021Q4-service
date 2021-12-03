import * as db from '../../inmamoryDB.js'

const getAll = async () => db.getAllBoards()
const create = async (name, login, password) => db.createBoard(name, login, password)
const getById = async (id) => db.getBoardById(id)
const update = async (id, name, login, password) => db.updateBoard(id, name, login, password)
const remove = async (id) => db.removeBoard(id)

export { getAll, create, getById, update, remove }