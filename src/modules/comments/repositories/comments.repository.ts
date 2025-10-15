import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseRepository } from 'src/common/repositories/base-repository.repository';
import { Comment } from '../entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { User } from 'src/modules/user/entities/user.entity';
import { Post } from 'src/modules/posts/entities/post.entity';
import { PaginatedResponseDto } from 'src/common/dtos/paginated-response.dto';
import { createPaginatedResponse } from 'src/common/helper/create-paginated-respone.helper';
import { UpdateCommentDto } from '../dtos/update-commet.dto';

@Injectable()
export class CommentRepository extends BaseRepository<Comment> {
  constructor(
    @InjectRepository(Comment)
    private readonly repo: Repository<Comment>,
  ) {
    super(repo);
  }

  async findPostById(postId: string): Promise<Post | null> {
    return await this.repo.manager.findOne(Post, {
      where: { post_id: postId },
    });
  }

  async findParentById(parentId: string): Promise<Comment | null> {
    return await this.repo.findOne({ where: { comment_id: parentId } });
  }

  async createComment(
    user: User,
    post: Post,
    dto: CreateCommentDto,
  ): Promise<Comment> {
    const { content, parent_id } = dto;
    let parentComment: Comment | null = null;

    if (parent_id) {
      parentComment = await this.findParentById(parent_id);
      if (!parentComment) {
        throw new Error('Parent comment not found');
      }
    }

    const newComment = this.repo.create({
      content,
      user,
      post,
      parent: parentComment ?? null,
    });

    return await this.repo.save(newComment);
  }

  async replyComment(
    parent_id: string,
    dto: CreateCommentDto,
    user: User,
  ): Promise<Comment> {
    const parent = await this.repo.findOne({
      where: { comment_id: parent_id },
      relations: ['post'],
    });

    if (!parent) throw new NotFoundException('parent comment not found');

    const reply = this.repo.create({
      content: dto.content,
      user: user,
      post: parent.post,
      parent,
    });

    return await this.save(reply);
  }

  async getCommentsByPost(
    post_id: string,
    page = 1,
    limit = 10,
  ): Promise<PaginatedResponseDto<Comment>> {
    const skip = (page - 1) * limit;

    const [data, total] = await this.repository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.author', 'author')
      .leftJoinAndSelect('comment.replies', 'replies')
      .leftJoinAndSelect('replies.author', 'replyAuthor')
      .where('comment.post.id = :postId', { post_id })
      .andWhere('comment.parent IS NULL')
      .andWhere('comment.deleted_at IS NULL')
      .orderBy('comment.created_at', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return createPaginatedResponse(data, total, page, limit);
  }

  async getCommentWithReplies(comment_id: string): Promise<Comment> {
    const comment = await this.repo.findOne({
      where: { comment_id: comment_id },
      relations: ['author', 'post', 'replies', 'replies.author'],
    });

    if (!comment) throw new NotFoundException('comment not found');

    return comment;
  }

  async updateComment(
    comment_id: string,
    dto: UpdateCommentDto,
  ): Promise<Comment> {
    const comment = await this.findByIdOrFail(comment_id);

    if (dto.content) {
      comment.content = dto.content;
    }
    return await this.save(comment);
  }

  async softDeleteComment(comment_id: string): Promise<boolean> {
    return await this.softDelete(comment_id);
  }

  async getReplies(parent_id: string): Promise<Comment[]> {
    return await this.repository.find({
      where: { parent: { comment_id: parent_id } },
      relations: ['author'],
      order: { createdAt: 'ASC' },
    });
  }

  async isOwner(comment_id: string, user_id: string): Promise<boolean> {
    const count = await this.repository
      .createQueryBuilder('comment')
      .leftJoin('comment.author', 'author')
      .where('comment.id = :comment_id', { comment_id })
      .andWhere('author.id = :user_id', { user_id })
      .getCount();

    return count > 0;
  }
}
