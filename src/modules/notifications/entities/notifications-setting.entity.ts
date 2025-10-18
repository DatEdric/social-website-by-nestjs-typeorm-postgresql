import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { NotificationType } from 'src/common/enums/notification.enum';

@Entity('notification_settings')
export class NotificationSetting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.notificationSettings)
  user: User;

  @Column({ type: 'enum', enum: NotificationType })
  type: NotificationType;

  @Column({ default: true })
  enabled: boolean;
}
