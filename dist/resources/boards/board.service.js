import * as boardService from './board.memory.repository.js';
const getAll = () => boardService.getAll();
const create = (board) => boardService.create(board);
const getById = (id) => boardService.getById(id);
const update = (board) => boardService.update(board);
const remove = (id) => boardService.remove(id);
export { getAll, create, getById, update, remove };
//# sourceMappingURL=board.service.js.map