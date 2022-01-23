import * as boardController from './board.repository.js';
const findById = (id) => boardController.findById(id);
const findAll = () => boardController.findAll();
const createBoard = (board) => boardController.createBoard(board);
const editBoard = (id, board) => boardController.editBoard(id, board);
const deleteBoard = (id) => boardController.deleteBoard(id);
export { findById, findAll, createBoard, editBoard, deleteBoard };
//# sourceMappingURL=board.service.js.map