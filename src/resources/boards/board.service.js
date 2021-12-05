import * as boardCtr from './board.memory.repository.js';

const getBoards = () => boardCtr.getAll();
const addBoard = (name, login, password) => boardCtr.create(name, login, password);
const getBoard = (id) => boardCtr.getById(id);
const updateBoard = (id, name, login, password) => boardCtr.update(id, name, login, password);
const deleteBoard = (id) => boardCtr.remove(id);

export { getBoard, getBoards, addBoard, deleteBoard, updateBoard }