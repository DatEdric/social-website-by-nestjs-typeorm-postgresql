import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { GetNotificationDto } from './dto/get-notification.dto';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new notification' })
  @ApiQuery({
    name: 'senderId',
    required: false,
    description: 'The ID of the sender (optional, may be system-generated)',
  })
  @ApiBody({ type: CreateNotificationDto })
  @ApiResponse({
    status: 201,
    description: 'Notification created successfully',
    type: GetNotificationDto,
  })
  create(
    @Body() dto: CreateNotificationDto,
    @Query('senderId') senderId?: string,
  ): Promise<GetNotificationDto> {
    return this.notificationsService.createNotifications(dto, senderId);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get all notifications for a specific user' })
  @ApiParam({ name: 'userId', description: 'The ID of the receiver user' })
  @ApiResponse({
    status: 200,
    description: 'List of user notifications',
    type: [GetNotificationDto],
  })
  getUserNotifications(@Param('userId') userId: string) {
    return this.notificationsService.getUserNotifications(userId);
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark a single notification as read' })
  @ApiParam({ name: 'id', description: 'The ID of the notification to update' })
  @ApiResponse({
    status: 200,
    description: 'Notification marked as read successfully',
    type: GetNotificationDto,
  })
  markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(id);
  }

  @Patch(':userId/read-all')
  @ApiOperation({ summary: 'Mark all user notifications as read' })
  @ApiParam({ name: 'userId', description: 'The ID of the receiver user' })
  @ApiResponse({
    status: 200,
    description: 'All unread notifications have been marked as read',
    schema: {
      example: {
        message: 'All notifications marked as read',
        count: 5,
      },
    },
  })
  markAllAsRead(@Param('userId') userId: string) {
    return this.notificationsService.markAllAsRead(userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a notification by its ID' })
  @ApiParam({ name: 'id', description: 'The ID of the notification to delete' })
  @ApiResponse({
    status: 200,
    description: 'Notification deleted successfully',
    schema: { example: { message: 'Notification deleted successfully' } },
  })
  deleteNotification(@Param('id') id: string) {
    return this.notificationsService.deleteNotification(id);
  }
}
