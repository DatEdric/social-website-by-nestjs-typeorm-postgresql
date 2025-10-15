import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommentRepository } from './repositories/comments.repository';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { Comment } from './entities/comment.entity';
import { User } from '../user/entities/user.entity';
import { PaginatedResponseDto } from 'src/common/dtos/paginated-response.dto';
import { UpdateCommentDto } from './dtos/update-commet.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async createComment(
    user: User,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const { post_id, parent_id } = createCommentDto;

    const post = await this.commentRepository.findPostById(post_id);
    if (!post) throw new NotFoundException('Post not found');

    let parentComment: Comment | null = null;
    if (parent_id) {
      parentComment = await this.commentRepository.findParentById(parent_id);

      if (!parentComment)
        throw new NotFoundException('Parent comment not found');
    }

    return await this.commentRepository.createComment(
      user,
      post,
      createCommentDto,
    );
  }

  async getCommetsByPost(
    post_id: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedResponseDto<Comment>> {
    const result = await this.commentRepository.getCommentsByPost(
      post_id,
      page,
      limit,
    );

    if (!result) throw new NotFoundException('comment not found');

    return result;
  }

  async getCommentithReplies(comment_id: string): Promise<Comment> {
    const comment =
      await this.commentRepository.getCommentWithReplies(comment_id);

    if (!comment) throw new NotFoundException('comment not found ');

    return comment;
  }

  async updateComment(
    comment_id,
    dto: UpdateCommentDto,
    user: User,
  ): Promise<Comment> {
    const isOwner = await this.commentRepository.isOwner(comment_id, user.id);

    if (!isOwner)
      throw new NotFoundException(
        'You do not have permission to edit this comment',
      );

    const updated = await this.commentRepository.updateComment(comment_id, dto);

    return updated;
  }

  async deleteComment(comment_id: string, user: User): Promise<boolean> {
    const isOwner = await this.commentRepository.isOwner(comment_id, user.id);

    if (!isOwner)
      throw new ForbiddenException(
        'You do not have permission to delete this comment',
      );

    return await this.commentRepository.softDeleteComment(comment_id);
  }

  async getReplies(parent_id: string): Promise<Comment[]> {
    const replies = await this.commentRepository.getReplies(parent_id);

    return replies;
  }
}
