import * as userService from './user.memory.repository.js'
import {UserInterface} from './user.model.js'

const getUsers = (): Promise<Array<UserInterface>> => userService.getAll()
const getById = (id: string): Promise<UserInterface|undefined> => userService.getById(id)
const create = (name: string, login: string, password: string): Promise<UserInterface> =>userService.create(name, login, password)
const update = (id: string, name: string, login: string, password: string): Promise<UserInterface|undefined> => userService.update(id, name, login, password)
const remove = (id: string): Promise<boolean> => userService.remove(id)

export { getUsers, create, getById, update, remove }

//  let all = getUsers()
//  console.log(all)

//  let byID = getById('87ef73a1-d7b8-4941-bd4e-424e58a0b3d5')
//  console.log(byID)


//  console.log('----------------------')

//  let newOne = create('Ivan','l','p')
//  console.log(newOne)

//  all = getUsers()
//  console.log(all)

//  let updatedOne = update('87ef73a1-d7b8-4941-bd4e-424e58a0b3d5', 'BILL','GATES','MICROSOFT')
//  console.log(updatedOne)

//  all = getUsers()
//  console.log(all)

//  let rmOne = remove('87ef73a1-d7b8-4941-bd4e-424e58a0b3d5')
//  console.log(rmOne)
//  console.log('----------------------')
//  all = getUsers()
//  console.log(all)