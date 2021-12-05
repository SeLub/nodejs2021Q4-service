import * as db from '../../inmamoryDB.js'

const getAll = async (request) => db.getAllTasks(request)
const create = async (request) => db.createTask(request)
const getById = async (request) => db.getTaskById(request)
const update = async (request) => db.updateTask(request)
const remove = async (request) => db.removeTask(request)

export { getAll, create, getById, update, remove }
