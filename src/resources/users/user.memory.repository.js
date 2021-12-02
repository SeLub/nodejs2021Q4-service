import * as db from '../../inmamoryDB.js'

const getAll = async () => db.getAllUsers()
const newUser = async (name, login, password) => db.createUser(name, login, password)
const getById = async (id) => db.getUserById(id)
const updateUser = async (id, name, login, password) => db.updateUser(id, name, login, password)
const deleteUser = async (id) => db.deleteUser(id)

export { getAll, newUser, getById, updateUser, deleteUser }