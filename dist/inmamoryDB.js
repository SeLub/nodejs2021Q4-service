import pkg from 'typeorm';
import { Board as BoardEntity } from './resources/boards/board.model.js';
import { User as UserEntity } from './resources/users/user.model.js';
import { Task as TaskEntity } from './resources/tasks/task.model.js';
const { getRepository } = pkg;
const getAllUsers = async () => getRepository(UserEntity)
    .createQueryBuilder("user")
    .getMany();
const getUserById = async (userId) => getRepository(UserEntity)
    .createQueryBuilder("user")
    .where("user.id = :id", { id: userId })
    .getOne();
const createUser = async (user) => {
    const newUser = new User(user);
    await getRepository(UserEntity)
        .createQueryBuilder("user")
        .insert()
        .into(UserEntity)
        .values(newUser)
        .execute();
    return newUser;
};
const updateUser = async (userIn) => {
    await getRepository(UserEntity)
        .createQueryBuilder("user")
        .update(UserEntity)
        .set({ name: userIn.name, login: userIn.login, password: userIn.password })
        .where("id = :id", { id: userIn.id })
        .execute();
    return getRepository(UserEntity)
        .createQueryBuilder("user")
        .where("user.id = :id", { id: userIn.id })
        .getOne();
};
const removeUser = async (userId) => {
    const resault = await getRepository(UserEntity)
        .createQueryBuilder("user")
        .delete()
        .from(UserEntity)
        .where("id = :id", { id: userId })
        .execute();
    return resault.affected !== 0;
};
const getAllBoards = async () => getRepository(BoardEntity)
    .createQueryBuilder('board')
    .getMany();
const getBoardById = async (boardId) => getRepository(BoardEntity)
    .createQueryBuilder("board")
    .where("board.id = :id", { id: boardId })
    .getOne();
const createBoard = async (board) => {
    const newBoard = new Board(board);
    await getRepository(BoardEntity)
        .createQueryBuilder("board")
        .insert()
        .into(BoardEntity)
        .values(newBoard)
        .execute();
    return newBoard;
};
const updateBoard = async (boardIn) => {
    await getRepository(BoardEntity)
        .createQueryBuilder("board")
        .update(BoardEntity)
        .set({ title: boardIn.title, columns: boardIn.columns })
        .where("id = :id", { id: boardIn.id })
        .execute();
    return getRepository(BoardEntity)
        .createQueryBuilder("board")
        .where("board.id = :id", { id: boardIn.id })
        .getOne();
};
const removeBoard = async (boardId) => {
    const resault = await getRepository(BoardEntity)
        .createQueryBuilder("board")
        .delete()
        .from(BoardEntity)
        .where("id = :id", { id: boardId })
        .execute();
    return resault.affected !== 0;
};
const getAllTasks = async (boardId) => getRepository(TaskEntity)
    .createQueryBuilder("task")
    .where("task.boardId = :boardId", { boardId })
    .getMany();
const getTaskById = async (boardId, taskId) => getRepository(TaskEntity)
    .createQueryBuilder("task")
    .where("task.boardId = :boardId", { boardId, id: taskId })
    .getOne();
const createTask = async (task) => {
    const newTask = new Task(task);
    await getRepository(TaskEntity)
        .createQueryBuilder("task")
        .insert()
        .into(TaskEntity)
        .values(newTask)
        .execute();
    return newTask;
};
const updateTask = async (taskIn) => {
    const oldTask = await getRepository(TaskEntity)
        .createQueryBuilder("task")
        .where("task.boardId = :boardId", { boardId: taskIn.boardId, id: taskIn.id })
        .getOne();
    if (oldTask !== undefined) {
        const newTask = { ...oldTask, ...taskIn };
        await getRepository(TaskEntity)
            .createQueryBuilder("task")
            .update(TaskEntity)
            .set(newTask)
            .where("task.id = :id", { id: taskIn.id })
            .execute();
        const updatedTask = await getRepository(TaskEntity)
            .createQueryBuilder("task")
            .where("task.id = :id", { id: taskIn.id })
            .getOne();
        return updatedTask;
    }
    return undefined;
};
const removeTask = async (boardId, taskId) => {
    const resault = await getRepository(TaskEntity)
        .createQueryBuilder("task")
        .delete()
        .from(TaskEntity)
        .where("id = :id", { id: taskId, boardId })
        .execute();
    return resault.affected !== 0;
};
export { getAllUsers, getUserById, createUser, updateUser, removeUser, getAllBoards, getBoardById, createBoard, updateBoard, removeBoard, getAllTasks, getTaskById, createTask, updateTask, removeTask };
//# sourceMappingURL=inmamoryDB.js.map