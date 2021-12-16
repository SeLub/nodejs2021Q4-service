import * as UserRepository from './user.memory.repository.js';
const getUsers = () => UserRepository.getAll();
const getById = (userId) => UserRepository.getById(userId);
const create = (user) => UserRepository.create(user);
const update = (user) => UserRepository.update(user);
const remove = (userId) => UserRepository.remove(userId);
export { getUsers, create, getById, update, remove };
//# sourceMappingURL=user.service.js.map