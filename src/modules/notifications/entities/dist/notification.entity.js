"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Notification = void 0;
var notification_enum_1 = require("src/common/enums/notification.enum");
var user_entity_1 = require("src/modules/user/entities/user.entity");
var typeorm_1 = require("typeorm");
var Notification = /** @class */ (function () {
    function Notification() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid')
    ], Notification.prototype, "notification_id");
    __decorate([
        typeorm_1.ManyToOne(function () { return user_entity_1.User; }, function (user) { return user.sentNotifications; }, {
            nullable: true,
            onDelete: 'CASCADE'
        })
    ], Notification.prototype, "sender");
    __decorate([
        typeorm_1.ManyToOne(function () { return user_entity_1.User; }, function (user) { return user.receivedNotifications; }, {
            nullable: true,
            onDelete: 'CASCADE'
        })
    ], Notification.prototype, "receiver");
    __decorate([
        typeorm_1.Column({ type: 'enum', "enum": notification_enum_1.NotificationType })
    ], Notification.prototype, "type");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], Notification.prototype, "reference_id");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], Notification.prototype, "post_id");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], Notification.prototype, "comment_id");
    __decorate([
        typeorm_1.Column({ type: 'text', nullable: true })
    ], Notification.prototype, "message");
    __decorate([
        typeorm_1.Column({ "default": false })
    ], Notification.prototype, "is_read");
    __decorate([
        typeorm_1.CreateDateColumn()
    ], Notification.prototype, "created_at");
    __decorate([
        typeorm_1.UpdateDateColumn()
    ], Notification.prototype, "updated_at");
    __decorate([
        typeorm_1.DeleteDateColumn()
    ], Notification.prototype, "deleted_at");
    Notification = __decorate([
        typeorm_1.Entity('notifications')
    ], Notification);
    return Notification;
}());
exports.Notification = Notification;
