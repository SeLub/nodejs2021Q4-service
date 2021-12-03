import * as userCtr from './user.memory.repository.js';

const getUsers = () => userCtr.getAll();
const addUser = (name, login, password) => userCtr.create(name, login, password);
const getUser = (id) => userCtr.getById(id);
const updateUser = (id, name, login, password) => userCtr.update(id, name, login, password);
const deleteUser = (id) => userCtr.remove(id);

export { getUser, getUsers, addUser, deleteUser, updateUser }