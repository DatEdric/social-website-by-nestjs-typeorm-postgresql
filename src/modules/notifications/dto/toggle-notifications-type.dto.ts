import { IsBoolean, IsEnum } from 'class-validator';
import { NotificationType } from 'src/common/enums/notification.enum';

export class ToggleNotificationTypeDto {
  @IsEnum(NotificationType)
  type: NotificationType;

  @IsBoolean()
  enabled: boolean;
}
