import { Board } from './board.model';
import { getRepository } from "typeorm";
const findById = async (id) => {
    const repository = await getRepository(Board);
    const board = repository.findOne({ id: id });
    if (!board) {
        return false;
    }
    return board;
};
const findAll = async () => {
    const repository = await getRepository(Board);
    return repository.find();
};
const createBoard = async (board) => {
    const repository = await getRepository(Board);
    const newBoard = repository.create({ ...board });
    await repository.save(newBoard);
    return newBoard;
};
const editBoard = async (id, board) => {
    const repository = await getRepository(Board);
    const editBoard = await repository.findOne({ id: id });
    if (!editBoard) {
        return false;
    }
    const _board = { ...editBoard, ...board };
    await repository.save(_board);
    return _board;
};
const deleteBoard = async (id) => {
    const repository = await getRepository(Board);
    const delBoard = await repository.findOne({ id: id });
    if (!delBoard) {
        return false;
    }
    await repository.remove(delBoard);
    return true;
};
export default {
    findById,
    findAll,
    createBoard,
    editBoard,
    deleteBoard
};
//# sourceMappingURL=board.memory.repository.js.map