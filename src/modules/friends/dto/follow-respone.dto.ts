import { ApiProperty } from '@nestjs/swagger';
import { UserSummaryDto } from './user-summary.dto';
import { Follow } from '../entities/follows.entity';

export class FollowResponseDto {
  @ApiProperty({ example: 'uuid-follow-id' })
  follow_id: string;

  @ApiProperty({ type: () => UserSummaryDto })
  follower: UserSummaryDto;

  @ApiProperty({ type: () => UserSummaryDto })
  following: UserSummaryDto;

  static fromEntity(follow: Follow): FollowResponseDto {
    return {
      follow_id: follow.id,
      follower: UserSummaryDto.fromEntity(follow.follower),
      following: UserSummaryDto.fromEntity(follow.following),
    };
  }
}
