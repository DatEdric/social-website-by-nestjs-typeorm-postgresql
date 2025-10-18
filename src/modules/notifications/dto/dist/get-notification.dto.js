"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GetNotificationDto = void 0;
var class_transformer_1 = require("class-transformer");
var get_user_dto_1 = require("src/modules/user/dto/get-user.dto");
var GetNotificationDto = /** @class */ (function () {
    function GetNotificationDto() {
    }
    __decorate([
        class_transformer_1.Expose()
    ], GetNotificationDto.prototype, "notification_id");
    __decorate([
        class_transformer_1.Expose(),
        class_transformer_1.Type(function () { return get_user_dto_1.GetUserDto; })
    ], GetNotificationDto.prototype, "sender");
    __decorate([
        class_transformer_1.Expose(),
        class_transformer_1.Type(function () { return get_user_dto_1.GetUserDto; })
    ], GetNotificationDto.prototype, "receiver");
    __decorate([
        class_transformer_1.Expose()
    ], GetNotificationDto.prototype, "type");
    __decorate([
        class_transformer_1.Expose()
    ], GetNotificationDto.prototype, "reference_id");
    __decorate([
        class_transformer_1.Expose()
    ], GetNotificationDto.prototype, "post_id");
    __decorate([
        class_transformer_1.Expose()
    ], GetNotificationDto.prototype, "comment_id");
    __decorate([
        class_transformer_1.Expose()
    ], GetNotificationDto.prototype, "message");
    __decorate([
        class_transformer_1.Expose()
    ], GetNotificationDto.prototype, "is_read");
    __decorate([
        class_transformer_1.Expose()
    ], GetNotificationDto.prototype, "created_at");
    return GetNotificationDto;
}());
exports.GetNotificationDto = GetNotificationDto;
