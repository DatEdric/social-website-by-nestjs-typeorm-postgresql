import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { NotificationType } from 'src/common/enums/notification.enum';

export class CreateNotificationDto {
  @IsUUID()
  receiverId: string;

  @IsEnum(NotificationType)
  type: NotificationType;

  @IsOptional()
  @IsString()
  referenceI_id?: string;

  @IsOptional()
  @IsString()
  message?: string;
}
