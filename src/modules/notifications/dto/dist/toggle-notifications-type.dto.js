"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ToggleNotificationTypeDto = void 0;
var class_validator_1 = require("class-validator");
var notification_enum_1 = require("src/common/enums/notification.enum");
var ToggleNotificationTypeDto = /** @class */ (function () {
    function ToggleNotificationTypeDto() {
    }
    __decorate([
        class_validator_1.IsEnum(notification_enum_1.NotificationType)
    ], ToggleNotificationTypeDto.prototype, "type");
    __decorate([
        class_validator_1.IsBoolean()
    ], ToggleNotificationTypeDto.prototype, "enabled");
    return ToggleNotificationTypeDto;
}());
exports.ToggleNotificationTypeDto = ToggleNotificationTypeDto;
