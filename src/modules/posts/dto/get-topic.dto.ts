import { Expose } from 'class-transformer';

export class GetTopicDto {
  @Expose()
  topic_name: string;

  @Expose()
  slug: string;
}
