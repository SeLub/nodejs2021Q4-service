import { randomUUID } from "crypto";
export default class Task {
    constructor({ title = "Autotest task", order = 0, description = "Lorem ipsum", userId = null, boardId = null, columnId = null, } = {}) {
        this.id = randomUUID();
        this.title = title;
        this.order = order;
        this.description = description;
        this.userId = userId;
        this.boardId = boardId;
        this.columnId = columnId;
    }
}
//# sourceMappingURL=task.model.js.map