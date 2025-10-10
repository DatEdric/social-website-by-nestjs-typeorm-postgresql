import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { GetUserDto } from 'src/modules/user/dto/get-user.dto';
import { GetTopicDto } from './get-topic.dto';

export class CreatePostDto {
  @Expose()
  @IsOptional()
  @IsString()
  post_id: string;

  @Expose()
  @IsString()
  @IsOptional()
  title?: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  subtitle: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  text: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  image_path: string;

  @Expose()
  @IsOptional()
  created_at: Date;

  @Expose()
  @IsOptional()
  @IsObject()
  @Type(() => GetUserDto)
  author: { id: string };

  @Expose()
  @IsNotEmpty()
  @IsObject()
  @Type(() => GetTopicDto)
  topic: { topic_id: string };
}
