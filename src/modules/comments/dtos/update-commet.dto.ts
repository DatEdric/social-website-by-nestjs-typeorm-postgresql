import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class UpdateCommentDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Content cannot be empty' })
  @MinLength(1, { message: 'Content must be at least 1 character' })
  @MaxLength(2000, { message: 'Content must not exceed 2000 characters' })
  content?: string;
}
