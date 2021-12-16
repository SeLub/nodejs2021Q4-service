/**
 * This module is implementation of Repository Layer (Data access) of application for {@link User} handling.
 * This module gets data from Data Layer (Database), handle them and send to {@link UserService}
 * @module UserRepository
 * @category Repository
 */

import * as db from '../../inmamoryDB.js'
import User from './user.model.js'

/**
* Async function returns the list of all users.
* @remarks This method has no arguments.
* @returns List of All Users.
* @category User
*/

const getAll = async (): Promise<Array<User>> => db.getAllUsers()

/**
* Async function returns one User by userId.
* @param userId -  id of the User.
* @returns One User or undefined.
* @category User
*/

const getById = async (userId: string): Promise<User|undefined> => db.getUserById(userId)

/**
* Async function creates and returns one User.
* @param user -  instance of class User.
* @returns One just created User.
* @category User
*/

const create = async (user: User): Promise<User> => db.createUser(user)

/**
* Async function updates one User.
* @param user -  instance of class User.
* @returns Updated User or undefined, if user not found in database.
* @category User
*/

const update = async (user: User): Promise<User|undefined> => db.updateUser(user)

/**
* Async function removes one User from database.
* @param userId -  id of the User
* @returns 'true' if user found in database and deleted, and 'false' otherwise.
* @category User
*/

const remove = async (userId: string): Promise<boolean> => db.removeUser(userId)

export { getAll, getById, create, update, remove }