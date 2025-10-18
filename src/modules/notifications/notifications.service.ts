import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationsRepository } from './repositories/notifications.repository';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(private readonly repo: NotificationsRepository) {}
  async createNotifications(
    createNotificationDto: CreateNotificationDto,
    senderId?: string,
  ): Promise<Notification> {
    const noti = await this.repo.createNotification(
      createNotificationDto,
      senderId,
    );

    if (!noti) throw new Error('Error creating notification');
    return noti;
  }

  async getUserNotifications(userId: string): Promise<Notification[]> {
    const noti = await this.repo.getUserNotifications(userId);

    if (!noti) throw new Error('No notifications found');

    return noti;
  }
  async markAsRead(id: string): Promise<Notification> {
    return this.repo.markAsRead(id);
  }
  async markAllAsRead(
    userId: string,
  ): Promise<{ message: string; count: number }> {
    return await this.repo.markAllAsRead(userId);
  }

  async deleteNotification(id: string): Promise<{ message: string }> {
    return await this.repo.deleteNotification(id);
  }
}
