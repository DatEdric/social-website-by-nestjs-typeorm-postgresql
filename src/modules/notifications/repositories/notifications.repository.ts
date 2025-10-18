import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseRepository } from 'src/common/repositories/base-repository.repository';
import { Notification } from '../entities/notification.entity';
import { DeepPartial, Repository } from 'typeorm';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { User } from 'src/modules/user/entities/user.entity';

@Injectable()
export class NotificationsRepository extends BaseRepository<Notification> {
  constructor(private readonly repo: Repository<Notification>) {
    super(repo);
  }

  async createNotification(
    dto: CreateNotificationDto,
    senderId?: string,
  ): Promise<Notification> {
    const notification = this.create({
      ...dto,
      sender: senderId ? ({ id: senderId } as DeepPartial<User>) : undefined,
      receiver: { id: dto.receiverId } as DeepPartial<User>,
    });
    return this.save(notification);
  }

  async markAsRead(id: string) {
    const noti = await this.findOne({ id } as any);
    if (!noti) throw new NotFoundException('Notification not found');

    noti.is_read = true;
    return this.save(noti);
  }

  async getUserNotifications(userId: string) {
    const notifications = await this.repo.find({
      where: { receiver: { id: userId } },
      order: { created_at: 'DESC' },
    });

    if (!notifications.length)
      throw new NotFoundException('No notifications found');
    return notifications;
  }

  async deleteNotification(id: string) {
    const noti = await this.findOne({ id } as any);
    if (!noti) throw new NotFoundException('Notification not found');
    await this.repo.remove(noti);
    return { message: 'Notification deleted successfully' };
  }

  async markAllAsRead(userId: string) {
    const result = await this.repo
      .createQueryBuilder()
      .update(Notification)
      .set({ is_read: true })
      .where('receiver.id = :userId', { userId })
      .execute();

    if (!result.affected)
      throw new NotFoundException('No notifications to update');
    return { message: 'All notifications marked as read' };
  }
}
