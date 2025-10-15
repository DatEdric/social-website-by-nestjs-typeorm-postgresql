import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dto/create-post.dto';
import { Post } from '../entities/post.entity';
import { BaseRepository } from 'src/common/repositories/base-repository.repository';
import { Topic } from '../entities/topic.entity';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PaginatedResponseDto } from '../../../common/dtos/paginated-response.dto';
import { GetPostDto } from '../dto/get-post.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PostRepository extends BaseRepository<Post> {
  constructor(
    @InjectRepository(Post)
    private readonly repo: Repository<Post>,
  ) {
    super(repo);
  }

  async findById(postId: string): Promise<Post | null> {
    return await this.repo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.topic', 'topic')
      .select([
        'post.post_id',
        'post.title',
        'post.subtitle',
        'post.text',
        'post.status',
        'post.views',
        'post.image_path',
        'author.id',
        'author.name',
        'author.email',
        'topic.topic_name',
        'topic.slug',
      ])
      .where('post.post_id = :postId', { postId })
      .getOne();
  }

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    const new_post = this.repo.create(createPostDto);
    return await this.repo.save(new_post);
  }

  async getAllPosts(id: string): Promise<Post[]> {
    return await this.repo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.topic', 'topic')
      .where('author.id = :id', { id })
      .andWhere('post.deleted_at IS NULL')
      .orderBy('post.created_at', 'DESC')
      .getMany();
  }

  async updatePost(
    postId: string,
    userId: string,
    dto: UpdatePostDto,
  ): Promise<Post | null> {
    const post = await this.findById(postId);
    if (!post || post.author.id !== userId) {
      throw new NotFoundException('Post not found or unauthorized');
    }
    Object.assign(post, dto);
    return await this.repo.save(post);
  }

  async getPostsWithRelations(
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedResponseDto<GetPostDto>> {
    const skip = (page - 1) * limit;

    const [data, total] = await this.repo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.topic', 'topic')
      .where('post.deleted_at IS NULL')
      .orderBy('post.created_at', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return new PaginatedResponseDto<GetPostDto>({
      data: plainToInstance(GetPostDto, data, {
        excludeExtraneousValues: true,
      }),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrevious: page > 1,
    });
  }

  async findPostsByTopic(topicSlug: string): Promise<Post[]> {
    return await this.repo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.topic', 'topic')
      .where('topic.slug = :topicSlug', { topicSlug })
      .andWhere('post.deleted_at IS NULL')
      .orderBy('post.created_at', 'DESC')
      .getMany();
  }

  /**
   * Tìm posts theo status
   */
  async findPostsByStatus(status: string): Promise<Post[]> {
    return await this.repo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.topic', 'topic')
      .where('post.status = :status', { status })
      .andWhere('post.deleted_at IS NULL')
      .orderBy('post.created_at', 'DESC')
      .getMany();
  }

  /**
   * Search posts by title or text
   */
  async searchPosts(searchTerm: string): Promise<Post[]> {
    return await this.repo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.topic', 'topic')
      .where(
        'post.title ILIKE :search OR post.subtitle ILIKE :search OR post.text ILIKE :search',
        { search: `%${searchTerm}%` },
      )
      .andWhere('post.deleted_at IS NULL')
      .orderBy('post.created_at', 'DESC')
      .getMany();
  }

  /**
   * Lấy posts phổ biến nhất (theo views)
   */
  async getPopularPosts(limit: number = 10): Promise<Post[]> {
    return await this.repo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.topic', 'topic')
      .where('post.deleted_at IS NULL')
      .orderBy('post.views', 'DESC')
      .take(limit)
      .getMany();
  }

  /**
   * Tăng view count
   */
  async incrementViews(postId: string): Promise<void> {
    await this.repo
      .createQueryBuilder()
      .update(Post)
      .set({ views: () => 'views + 1' })
      .where('post_id = :postId', { postId })
      .execute();
  }

  /**
   * Lấy posts của author với pagination
   */
  async getAuthorPostsPaginated(
    authorId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedResponseDto<Post>> {
    const skip = (page - 1) * limit;

    const [data, total] = await this.repo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.topic', 'topic')
      .where('author.id = :authorId', { authorId })
      .andWhere('post.deleted_at IS NULL')
      .orderBy('post.created_at', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrevious: page > 1,
    };
  }

  /**
   * Lấy draft posts của author
   */
  async getDraftPosts(authorId: string): Promise<Post[]> {
    return await this.repo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.topic', 'topic')
      .where('author.id = :authorId', { authorId })
      .andWhere('post.status = :status', { status: 'draft' })
      .andWhere('post.deleted_at IS NULL')
      .orderBy('post.updated_at', 'DESC')
      .getMany();
  }

  /**
   * Đếm posts theo author
   */
  async countPostsByAuthor(authorId: string): Promise<number> {
    return await this.repo
      .createQueryBuilder('post')
      .where('post.author.id = :authorId', { authorId })
      .andWhere('post.deleted_at IS NULL')
      .getCount();
  }

  /**
   * Soft delete post (override để set deleted_at)
   */
  async softDelete(postId: string): Promise<boolean> {
    const result = await this.repo
      .createQueryBuilder()
      .update(Post)
      .set({ deleted_at: new Date() })
      .where('post_id = :postId', { postId })
      .execute();

    return (result.affected || 0) > 0;
  }

  /**
   * Restore soft deleted post
   */
  async restore(postId: string): Promise<boolean> {
    const result = await this.repo
      .createQueryBuilder()
      .update(Post)
      .set({ deleted_at: () => 'NULL' })
      .where('post_id = :postId', { postId })
      .execute();

    return (result.affected || 0) > 0;
  }

  /**
   * Lấy related posts (cùng topic, khác post)
   */
  async getRelatedPosts(
    postId: string,
    topicId: string,
    limit: number = 5,
  ): Promise<Post[]> {
    const currentPost = await this.findById(postId);
    if (!currentPost || !currentPost.topic) return [];

    return await this.repo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.topic', 'topic')
      .where('topic.id = :topicId', { topicId })
      .andWhere('post.post_id != :postId', { postId })
      .andWhere('post.status = :status', { status: 'published' })
      .andWhere('post.deleted_at IS NULL')
      .orderBy('post.created_at', 'DESC')
      .take(limit)
      .getMany();
  }
}
