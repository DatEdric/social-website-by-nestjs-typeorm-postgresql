import { Expose } from 'class-transformer';
import { Membership } from 'src/common/enums/membership.enum';

export class GetUserDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  avatar_url: string;

  @Expose()
  followers_count: number;

  @Expose()
  following_count: number;

  @Expose()
  membership_status: Membership;
}
