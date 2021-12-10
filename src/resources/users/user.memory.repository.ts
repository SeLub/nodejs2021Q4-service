import * as db from '../../inmamoryDB.js'
import { UserInterface } from './user.model.js'

const getAll = async (): Promise<Array<UserInterface>> => db.getAllUsers();
const getById = async (id: string): Promise<UserInterface|undefined> => db.getUserById(id);
const create = async (name: string, login: string, password: string): Promise<UserInterface | undefined> => db.createUser(name, login, password);
const update = async (id: string, name: string, login: string, password: string): Promise<UserInterface|undefined> => db.updateUser(id, name, login, password);
const remove = async (id: string): Promise<boolean> => db.removeUser(id);

export { getAll, getById, create, update, remove }

// let all = getAll()
// console.log(all)

// let newOne = create('Ivan','l','p')
// console.log(newOne)

// all = getAll()
// console.log(all)

// let updOne = update('87ef73a1-d7b8-4941-bd4e-424e58a0b3d5', 'VASYA','l','PASS')
// console.log(updOne)

// all = getAll()
// console.log(all)

// let rm = remove('87ef73a1-d7b8-4941-bd4e-424e58a0b3d5')
// console.log(rm)
// console.log('---------------------------')
// all = getAll()
// console.log(all)