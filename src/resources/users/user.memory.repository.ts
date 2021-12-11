import * as db from '../../inmamoryDB.js'
import { UserInterface } from './user.model.js'

const getAll = async (): Promise<Array<UserInterface>> => db.getAllUsers()
const getById = async (id: string): Promise<UserInterface|undefined> => db.getUserById(id)
const create = async (name: string, login: string, password: string): Promise<UserInterface> => db.createUser(name, login, password)
const update = async (id: string, name: string, login: string, password: string): Promise<UserInterface|undefined> => db.updateUser(id, name, login, password)
const remove = async (id: string): Promise<boolean> => db.removeUser(id)

export { getAll, getById, create, update, remove }