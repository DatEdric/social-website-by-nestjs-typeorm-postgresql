import { Injectable } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';
import { Membership } from 'src/common/enums/membership.enum';

@Injectable()
export class GetProfileDto {
  @Expose()
  @IsOptional()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  email: string;

  @Expose()
  @IsString()
  @IsOptional()
  name?: string;

  @Expose()
  @IsString()
  @IsOptional()
  full_name?: string;

  @Expose()
  @IsString()
  @IsOptional()
  bio?: string;

  @Expose()
  @IsUrl()
  @IsOptional()
  avatar_url?: string;

  @Expose()
  followers_count: number;

  @Expose()
  following_count: number;

  @Expose()
  @IsEnum(Membership)
  membership_status: Membership;

  @Expose()
  @IsString()
  @IsOptional()
  social_link?: string;

  @Expose()
  @IsString()
  @IsOptional()
  address?: string;
}
