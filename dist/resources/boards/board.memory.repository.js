import * as db from '../../inmamoryDB.js';
const getAll = async () => db.getAllBoards();
const getById = async (id) => db.getBoardById(id);
const create = async (board) => db.createBoard(board);
const update = async (board) => db.updateBoard(board);
const remove = async (id) => db.removeBoard(id);
export { getAll, create, getById, update, remove };
//# sourceMappingURL=board.memory.repository.js.map