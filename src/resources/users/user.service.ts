import * as userService from './user.memory.repository.js'
import User from './user.model.js'

const getUsers = (): Promise<Array<User>> => userService.getAll()
const getById = (userId: string): Promise<User|undefined> => userService.getById(userId)
const create = (user: User): Promise<User> =>userService.create(user)
const update = (user: User): Promise<User|undefined> => userService.update(user)
const remove = (userId: string): Promise<boolean> => userService.remove(userId)

export { getUsers, create, getById, update, remove }