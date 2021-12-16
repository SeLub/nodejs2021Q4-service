import { randomUUID } from "crypto";
export class Board {
    constructor({ title = "Autotest board", columns = [
        { id: null, title: 'Backlog', order: 1 },
        { id: null, title: 'Sprint', order: 2 }
    ] } = {}) {
        this.id = randomUUID();
        this.title = title;
        this.columns = columns;
    }
}
//# sourceMappingURL=board.model.js.map