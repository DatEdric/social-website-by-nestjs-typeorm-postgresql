import {
  IsString,
  IsOptional,
  IsEnum,
  IsInt,
  IsArray,
  IsBoolean,
  IsDate,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PostStatus } from 'src/common/enums/post-status.enum';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  subtitle?: string;

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsEnum(PostStatus)
  status?: PostStatus = PostStatus.DRAFT;

  @IsOptional()
  @IsInt()
  views?: number;

  @IsOptional()
  @IsString()
  image_path?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  published_at?: Date;

  @IsOptional()
  @IsBoolean()
  is_deleted?: boolean;

  // Quan hệ (nếu cho phép cập nhật)
  @IsOptional()
  @IsUUID()
  topic_id?: string;
}
