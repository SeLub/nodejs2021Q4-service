import * as db from '../../inmamoryDB.js'

const getAll = async () => db.getAllUsers()
const create = async (name, login, password) => db.createUser(name, login, password)
const getById = async (id) => db.getUserById(id)
const update = async (id, name, login, password) => db.updateUser(id, name, login, password)
const remove = async (id) => db.removeUser(id)

export { getAll, create, getById, update, remove }