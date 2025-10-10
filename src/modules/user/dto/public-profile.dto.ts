import { OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class PublicProfileDto extends OmitType(User, [
  'email',
  'password',
  'address',
  'role',
  'isDeleted',
  'deleted_at',
] as const) {}
