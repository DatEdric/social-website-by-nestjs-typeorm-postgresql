import { ApiProperty } from '@nestjs/swagger';
import { Friend } from '../entities/friend.entity';
import { UserSummaryDto } from './user-summary.dto';
import { MakeFiendStatus } from 'src/common/enums/status-make-friend.enum';

export class FriendResponseDto {
  @ApiProperty({ example: 'uuid-friend-id' })
  friend_id: string;

  @ApiProperty({ enum: MakeFiendStatus, example: MakeFiendStatus.PENDING })
  status: MakeFiendStatus;

  @ApiProperty({ type: () => UserSummaryDto })
  sender: UserSummaryDto;

  @ApiProperty({ type: () => UserSummaryDto })
  receiver: UserSummaryDto;

  static fromEntity(friend: Friend): FriendResponseDto {
    return {
      friend_id: friend.friend_id,
      status: friend.status,
      sender: UserSummaryDto.fromEntity(friend.sender),
      receiver: UserSummaryDto.fromEntity(friend.receiver),
    };
  }
}
