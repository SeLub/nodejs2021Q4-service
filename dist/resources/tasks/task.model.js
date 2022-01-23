var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import pkg from 'typeorm';
import { Board } from '../boards/board.model.js';
import { User } from '../users/user.model.js';
const { Entity, PrimaryGeneratedColumn, Column, ManyToOne } = pkg;
let Task = class Task {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Task.prototype, "id", void 0);
__decorate([
    Column({ default: '' }),
    __metadata("design:type", String)
], Task.prototype, "title", void 0);
__decorate([
    Column({ default: 0 }),
    __metadata("design:type", Number)
], Task.prototype, "order", void 0);
__decorate([
    Column({ default: '' }),
    __metadata("design:type", String)
], Task.prototype, "description", void 0);
__decorate([
    Column('uuid', { nullable: true }),
    __metadata("design:type", Object)
], Task.prototype, "userId", void 0);
__decorate([
    ManyToOne(() => User, { onDelete: 'SET NULL' }),
    __metadata("design:type", Object)
], Task.prototype, "user", void 0);
__decorate([
    Column('uuid'),
    __metadata("design:type", String)
], Task.prototype, "boardId", void 0);
__decorate([
    ManyToOne(() => Board, (board) => board.tasks, { onDelete: 'CASCADE' }),
    __metadata("design:type", Object)
], Task.prototype, "board", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", Object)
], Task.prototype, "columnId", void 0);
Task = __decorate([
    Entity({ name: 'tasks' })
], Task);
export { Task };
//# sourceMappingURL=task.model.js.map