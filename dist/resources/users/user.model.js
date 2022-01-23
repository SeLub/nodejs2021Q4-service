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
const { Entity, PrimaryGeneratedColumn, Column } = pkg;
let User = class User {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    Column('varchar', {
        default: 'USER'
    }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    Column('varchar', {
        default: 'user'
    }),
    __metadata("design:type", String)
], User.prototype, "login", void 0);
__decorate([
    Column('varchar', {
        default: 'P@55w0rd',
        select: false
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
User = __decorate([
    Entity({ name: 'users' })
], User);
export { User };
export const toResponse = (user) => {
    const { id, name, login } = user;
    return { id, name, login };
};
//# sourceMappingURL=user.model.js.map