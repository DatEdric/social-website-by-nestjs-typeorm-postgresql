import { Delete } from '@nestjs/common';
import { NotificationType } from 'src/common/enums/notification.enum';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  notification_id: string;

  @ManyToOne(() => User, (user) => user.sentNotifications, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedNotifications, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  receiver: User;

  @Column({ type: 'enum', enum: NotificationType })
  type: NotificationType;

  @Column({ nullable: true })
  reference_id: string;

  @Column({ nullable: true })
  post_id: string;

  @Column({ nullable: true })
  comment_id: string;

  @Column({ type: 'text', nullable: true })
  message?: string;

  @Column({ default: false })
  is_read: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
