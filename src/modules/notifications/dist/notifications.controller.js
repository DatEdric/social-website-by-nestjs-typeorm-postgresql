"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.NotificationsController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var create_notification_dto_1 = require("./dto/create-notification.dto");
var get_notification_dto_1 = require("./dto/get-notification.dto");
var NotificationsController = /** @class */ (function () {
    function NotificationsController(notificationsService) {
        this.notificationsService = notificationsService;
    }
    NotificationsController.prototype.create = function (dto, senderId) {
        return this.notificationsService.createNotifications(dto, senderId);
    };
    NotificationsController.prototype.getUserNotifications = function (userId) {
        return this.notificationsService.getUserNotifications(userId);
    };
    NotificationsController.prototype.markAsRead = function (id) {
        return this.notificationsService.markAsRead(id);
    };
    NotificationsController.prototype.markAllAsRead = function (userId) {
        return this.notificationsService.markAllAsRead(userId);
    };
    // 🗑️ Delete a notification
    NotificationsController.prototype.deleteNotification = function (id) {
        return this.notificationsService.deleteNotification(id);
    };
    __decorate([
        common_1.Post(),
        swagger_1.ApiOperation({ summary: 'Create a new notification' }),
        swagger_1.ApiQuery({
            name: 'senderId',
            required: false,
            description: 'The ID of the sender (optional, may be system-generated)'
        }),
        swagger_1.ApiBody({ type: create_notification_dto_1.CreateNotificationDto }),
        swagger_1.ApiResponse({
            status: 201,
            description: 'Notification created successfully',
            type: get_notification_dto_1.GetNotificationDto
        }),
        __param(0, common_1.Body()),
        __param(1, common_1.Query('senderId'))
    ], NotificationsController.prototype, "create");
    __decorate([
        common_1.Get(':userId'),
        swagger_1.ApiOperation({ summary: 'Get all notifications for a specific user' }),
        swagger_1.ApiParam({ name: 'userId', description: 'The ID of the receiver user' }),
        swagger_1.ApiResponse({
            status: 200,
            description: 'List of user notifications',
            type: [get_notification_dto_1.GetNotificationDto]
        }),
        __param(0, common_1.Param('userId'))
    ], NotificationsController.prototype, "getUserNotifications");
    __decorate([
        common_1.Patch(':id/read'),
        swagger_1.ApiOperation({ summary: 'Mark a single notification as read' }),
        swagger_1.ApiParam({ name: 'id', description: 'The ID of the notification to update' }),
        swagger_1.ApiResponse({
            status: 200,
            description: 'Notification marked as read successfully',
            type: get_notification_dto_1.GetNotificationDto
        }),
        __param(0, common_1.Param('id'))
    ], NotificationsController.prototype, "markAsRead");
    __decorate([
        common_1.Patch(':userId/read-all'),
        swagger_1.ApiOperation({ summary: 'Mark all user notifications as read' }),
        swagger_1.ApiParam({ name: 'userId', description: 'The ID of the receiver user' }),
        swagger_1.ApiResponse({
            status: 200,
            description: 'All unread notifications have been marked as read',
            schema: {
                example: {
                    message: 'All notifications marked as read',
                    count: 5
                }
            }
        }),
        __param(0, common_1.Param('userId'))
    ], NotificationsController.prototype, "markAllAsRead");
    __decorate([
        common_1.Delete(':id'),
        swagger_1.ApiOperation({ summary: 'Delete a notification by its ID' }),
        swagger_1.ApiParam({ name: 'id', description: 'The ID of the notification to delete' }),
        swagger_1.ApiResponse({
            status: 200,
            description: 'Notification deleted successfully',
            schema: { example: { message: 'Notification deleted successfully' } }
        }),
        __param(0, common_1.Param('id'))
    ], NotificationsController.prototype, "deleteNotification");
    NotificationsController = __decorate([
        swagger_1.ApiTags('Notifications'),
        common_1.Controller('notifications')
    ], NotificationsController);
    return NotificationsController;
}());
exports.NotificationsController = NotificationsController;
