"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Friend = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("src/modules/user/entities/user.entity");
var status_make_friend_enum_1 = require("src/common/enums/status-make-friend.enum");
var Friend = /** @class */ (function () {
    function Friend() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid')
    ], Friend.prototype, "friend_id");
    __decorate([
        typeorm_1.ManyToOne(function () { return user_entity_1.User; }, function (user) { return user.sentFriendRequests; }, {
            onDelete: 'CASCADE'
        })
    ], Friend.prototype, "sender");
    __decorate([
        typeorm_1.ManyToOne(function () { return user_entity_1.User; }, function (user) { return user.receivedFriendRequests; }, {
            onDelete: 'CASCADE'
        })
    ], Friend.prototype, "receiver");
    __decorate([
        typeorm_1.Column({
            type: 'enum',
            "enum": status_make_friend_enum_1.MakeFiendStatus,
            "default": status_make_friend_enum_1.MakeFiendStatus.PENDING
        })
    ], Friend.prototype, "status");
    __decorate([
        typeorm_1.CreateDateColumn()
    ], Friend.prototype, "created_at");
    __decorate([
        typeorm_1.UpdateDateColumn()
    ], Friend.prototype, "updated_at");
    Friend = __decorate([
        typeorm_1.Entity('friend'),
        typeorm_1.Unique(['sender', 'receiver'])
    ], Friend);
    return Friend;
}());
exports.Friend = Friend;
