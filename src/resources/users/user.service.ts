/**
 * This module is implementation of Service Layer (Business Logic) of application for {@link User} handling
 * This module gets data from {@link UserRepository}, handle them and send to {@link UserRouter}
 * @module UserService
 * @category Service
*/
import * as UserRepository from './user.memory.repository.js'
import User from './user.model.js'

/**
* Async function returns the list of all users.
* @remarks This method has no arguments.
* @returns List of All Users.
* @category User
*/

const getUsers = (): Promise<Array<User>> => UserRepository.getAll()

/**
* Async function returns one User by userId.
* @param userId -  id of the User.
* @returns One User or undefined.
* @category User
*/

const getById = (userId: string): Promise<User|undefined> => UserRepository.getById(userId)

/**
* Async function creates and returns one User.
* @param user -  instance of class User.
* @returns One just created User.
* @category User
*/

const create = (user: User): Promise<User> =>UserRepository.create(user)

/**
* Async function updates one User.
* @param user -  instance of class User.
* @returns Updated User or undefined, if user not found in database.
* @category User
*/

const update = (user: User): Promise<User|undefined> => UserRepository.update(user)

/**
* Async function removes one User from database.
* @param userId -  id of the User
* @returns 'true' if user found in database and deleted, and 'false' otherwise.
* @category User
*/

const remove = (userId: string): Promise<boolean> => UserRepository.remove(userId)

export { getUsers, create, getById, update, remove }