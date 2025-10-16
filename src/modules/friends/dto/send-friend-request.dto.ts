import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class SendFriendRequestDto {
  @ApiProperty({
    example: 'uuid-of-receiver',
    description: 'ID người nhận lời mời kết bạn',
  })
  @IsUUID()
  receiver_id: string;
}
