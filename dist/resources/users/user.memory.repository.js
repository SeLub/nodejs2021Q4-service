import * as db from '../../inmamoryDB.js';
const getAll = async () => db.getAllUsers();
const getById = async (userId) => db.getUserById(userId);
const create = async (user) => db.createUser(user);
const update = async (user) => db.updateUser(user);
const remove = async (userId) => db.removeUser(userId);
export { getAll, getById, create, update, remove };
//# sourceMappingURL=user.memory.repository.js.map