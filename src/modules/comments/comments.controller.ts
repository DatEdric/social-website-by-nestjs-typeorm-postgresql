import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { GetCommentDto } from './dtos/get-comment.dto';
import { plainToInstance } from 'class-transformer';
import { PaginatedResponseDto } from 'src/common/dtos/paginated-response.dto';
import { createPaginatedResponse } from 'src/common/helper/create-paginated-respone.helper';
import { UpdateCommentDto } from './dtos/update-commet.dto';

@ApiTags('Comments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({ summary: 'create a new comment for a post' })
  @ApiResponse({ status: 201, description: 'comment created' })
  @ApiResponse({ status: 400, description: 'invalid data' })
  async createComment(
    @CurrentUser() user: User,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<GetCommentDto> {
    const result = await this.commentsService.createComment(
      user,
      createCommentDto,
    );
    return plainToInstance(GetCommentDto, result, {
      excludeExtraneousValues: true,
    });
  }

  @Post('post/"post_id')
  @ApiOperation({ summary: 'get list comment of the post' })
  @ApiParam({ name: 'post_id', description: 'ID comment' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({
    status: 200,
    description: 'The comment list has been successfully retrieved',
    type: PaginatedResponseDto,
  })
  async getCommentsByPost(
    @Param('post_id') post_id: string,
    @Query('page', new ParseIntPipe()) page = 1,
    @Query('limit', new ParseIntPipe()) limit = 10,
  ): Promise<PaginatedResponseDto<GetCommentDto>> {
    const comment = await this.commentsService.getCommetsByPost(
      post_id,
      page,
      limit,
    );

    const mapedData = plainToInstance(GetCommentDto, comment.data, {
      excludeExtraneousValues: true,
    });

    return createPaginatedResponse(
      mapedData,
      comment.total,
      comment.page,
      comment.limit,
    );
  }

  @Get(':comment_id')
  @ApiOperation({ summary: 'get detal 1 comment and all reply' })
  @ApiParam({ name: 'comment_id', description: 'ID of comment ' })
  @ApiResponse({ status: 200, type: GetCommentDto })
  async getCommentWithReplies(
    @Param('comment_id') comment_id: string,
  ): Promise<GetCommentDto> {
    const comment = await this.commentsService.getCommentithReplies(comment_id);
    return plainToInstance(GetCommentDto, comment, {
      excludeExtraneousValues: true,
    });
  }

  @Put(':comment_id')
  @ApiOperation({ summary: 'Update comment content' })
  @ApiParam({ name: 'comment_id', description: 'ID of the comment to update' })
  @ApiResponse({
    status: 200,
    description: 'Comment has been updated',
    type: GetCommentDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - No permission to edit',
  })
  async updateComment(
    @Param('comment_id') comment_id: string,
    @Body() dto: UpdateCommentDto,
    @CurrentUser() user: User,
  ): Promise<GetCommentDto> {
    const updated = await this.commentsService.updateComment(
      comment_id,
      dto,
      user,
    );
    return plainToInstance(GetCommentDto, updated, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':comment_id')
  @ApiOperation({ summary: 'Xóa mềm bình luận' })
  @ApiParam({ name: 'comment_id', description: 'ID của bình luận cần xóa' })
  @ApiResponse({
    status: 200,
    description: 'Bình luận đã được xóa (soft delete)',
  })
  @ApiResponse({ status: 403, description: 'Không có quyền xóa' })
  async deleteComment(
    @Param('comment_id') comment_id: string,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return await this.commentsService.deleteComment(comment_id, user);
  }

  @Get(':parent_id/replies')
  @ApiOperation({ summary: 'Lấy danh sách reply của một bình luận cha' })
  @ApiParam({ name: 'parent_id', description: 'ID của bình luận cha' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách reply',
    type: [GetCommentDto],
  })
  async getReplies(
    @Param('parent_id') parent_id: string,
  ): Promise<GetCommentDto[]> {
    const replies = await this.commentsService.getReplies(parent_id);
    return plainToInstance(GetCommentDto, replies, {
      excludeExtraneousValues: true,
    });
  }
}
