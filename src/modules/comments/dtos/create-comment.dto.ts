import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Nội dung bình luận',
    example: 'Bài viết này hay quá!',
  })
  @IsNotEmpty({ message: 'Nội dung bình luận không được để trống' })
  @IsString({ message: 'Nội dung bình luận phải là chuỗi' })
  @MaxLength(500, {
    message: 'Nội dung bình luận không được vượt quá 500 ký tự',
  })
  content: string;

  @ApiProperty({
    description: 'ID của bài viết mà bình luận này thuộc về',
    example: 'a0c16f2d-6c3b-4db1-93b9-8b5f729f5213',
  })
  @IsNotEmpty({ message: 'post_id là bắt buộc' })
  @IsUUID('all', { message: 'post_id phải là UUID hợp lệ' })
  post_id: string;

  @ApiPropertyOptional({
    description: 'ID của bình luận cha (nếu là reply)',
    example: 'b8d34e7a-1c1b-42a9-8d89-16f1e82b8a76',
  })
  @IsOptional()
  @IsUUID('all', { message: 'parent_id phải là UUID hợp lệ' })
  parent_id?: string;
}
