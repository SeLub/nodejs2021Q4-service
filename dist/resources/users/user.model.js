import { randomUUID } from "crypto";
export default class User {
    constructor({ name = "TEST_USER", login = "test_user", password = "T35t_P@55w0rd" } = {}) {
        this.id = randomUUID();
        this.name = name;
        this.login = login;
        this.password = password;
    }
    static toResponse(user) {
        const { id, name, login } = user;
        return { id, name, login };
    }
}
//# sourceMappingURL=user.model.js.map