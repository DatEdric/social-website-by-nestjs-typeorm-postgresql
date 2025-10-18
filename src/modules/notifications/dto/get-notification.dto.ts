import { Expose, Type } from 'class-transformer';
import { NotificationType } from 'src/common/enums/notification.enum';
import { GetUserDto } from 'src/modules/user/dto/get-user.dto';

export class GetNotificationDto {
  @Expose()
  notification_id: string;

  @Expose()
  @Type(() => GetUserDto)
  sender?: GetUserDto;

  @Expose()
  @Type(() => GetUserDto)
  receiver: GetUserDto;

  @Expose()
  type: NotificationType;

  @Expose()
  reference_id?: string;

  @Expose()
  post_id?: string;

  @Expose()
  comment_id?: string;

  @Expose()
  message?: string;

  @Expose()
  is_read: boolean;

  @Expose()
  created_at: Date;
}
