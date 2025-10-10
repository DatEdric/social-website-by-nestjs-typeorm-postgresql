import { Expose, Type } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { PostStatus } from 'src/common/enums/post-status.enum';
import { GetUserDto } from 'src/modules/user/dto/get-user.dto';
import { GetTopicDto } from './get-topic.dto';

export class GetPostDto {
  @Expose()
  post_id: string;

  @Expose()
  title?: string;

  @Expose()
  subtitle: string;

  @Expose()
  text: string;

  @Expose()
  @IsEnum(PostStatus)
  status?: PostStatus = PostStatus.DRAFT;

  @Expose()
  tags?: string[];

  @Expose()
  @IsOptional()
  published_at?: Date;

  @Expose()
  views: number;

  @Expose()
  image_path: string;

  @Expose()
  created_at: Date;

  @Expose()
  @Type(() => GetUserDto)
  author: GetUserDto;

  @Expose()
  @Type(() => GetTopicDto)
  topic: GetTopicDto;
}
