import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/user/entities/user.entity';

export class UserSummaryDto {
  @ApiProperty({ example: 'uuid-user-id' })
  id: string;

  @ApiProperty({ example: 'John Doe' })
  username: string;

  @ApiProperty({ example: 'https://example.com/avatar.jpg', required: false })
  avatar?: string;

  static fromEntity(user: User): UserSummaryDto {
    return {
      id: user.id,
      username: user.name,
      avatar: user.avatar_url,
    };
  }
}
