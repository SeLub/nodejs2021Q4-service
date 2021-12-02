import database from './resources/users/Users.js'
import User from './resources/users/user.model.js';

let mockUsers = database; let item;

const getAllUsers = () =>mockUsers

const getUserById = (req) =>{
    const {id} = req.params
    item = mockUsers.find(el => el.id === id)
    return item
}
const createUser = (req) =>{
    const { name, login, password } = req.body
    const newUser = new User(name,login, password)
    mockUsers = [...mockUsers, newUser]
    return newUser
}

const updateUser = (req) =>{
    const {id} = req.params
    const { name, login, password } = req.body
    mockUsers = mockUsers.map(el => el.id === id ? { id, name, login, password } : item)
    item = mockUsers.find(el => el.id === id)
    return item

}

const deleteUser = (req) =>{
    const {id} = req.params
    mockUsers = mockUsers.filter(el => el.id !== id)
    return { message: `Item id:${id} has been removed.`}
}

export {getAllUsers, getUserById, createUser, updateUser, deleteUser }