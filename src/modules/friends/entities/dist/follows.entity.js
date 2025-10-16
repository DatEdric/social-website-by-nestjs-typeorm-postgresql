"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Follow = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("src/modules/user/entities/user.entity");
var Follow = /** @class */ (function () {
    function Follow() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid')
    ], Follow.prototype, "id");
    __decorate([
        typeorm_1.ManyToOne(function () { return user_entity_1.User; }, function (user) { return user.following; })
    ], Follow.prototype, "follower");
    __decorate([
        typeorm_1.ManyToOne(function () { return user_entity_1.User; }, function (user) { return user.followers; })
    ], Follow.prototype, "following");
    __decorate([
        typeorm_1.CreateDateColumn()
    ], Follow.prototype, "created_at");
    Follow = __decorate([
        typeorm_1.Entity('follow')
    ], Follow);
    return Follow;
}());
exports.Follow = Follow;
