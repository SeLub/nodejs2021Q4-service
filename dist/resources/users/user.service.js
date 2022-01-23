import userController from './user.repository.js';
const findById = (id) => userController.findById(id);
const findAll = () => userController.findAll();
const createUser = (user) => userController.createUser(user);
const editUser = (id, user) => userController.editUser(id, user);
const deleteUser = (id) => userController.deleteUser(id);
export { findById, findAll, createUser, editUser, deleteUser };
//# sourceMappingURL=user.service.js.map