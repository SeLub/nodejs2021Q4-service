import * as userCtr from './user.memory.repository.js';

const getUsers = () => userCtr.getAll();
const addUser = (name, login, password) => userCtr.newUser(name, login, password);
const getUser = (id) => userCtr.getById(id);
const updateUser = (id, name, login, password) => userCtr.updateUser(id, name, login, password);
const deleteUser = (id) => userCtr.deleteUser(id);

export { getUser, getUsers, addUser, deleteUser, updateUser }