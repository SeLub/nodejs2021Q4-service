import * as db from '../../inmamoryDB.js'
import User from './user.model.js'

const getAll = async (): Promise<Array<User>> => db.getAllUsers()
const getById = async (userId: string): Promise<User|undefined> => db.getUserById(userId)
const create = async (user: User): Promise<User> => db.createUser(user)
const update = async (userId: string, user: User): Promise<User|undefined> => db.updateUser(userId, user)
const remove = async (userId: string): Promise<boolean> => db.removeUser(userId)

export { getAll, getById, create, update, remove }