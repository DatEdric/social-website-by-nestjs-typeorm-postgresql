import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
import { PostRepository } from './repositories/post.repository';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly postRepository: PostRepository) {}

  async findOnePost(post_id: string): Promise<Post> {
    const check_post_existing = await this.postRepository.findById(post_id);
    if (!check_post_existing) throw new ConflictException('Post is not found');
    return check_post_existing;
  }

  async createNewPost(
    userId: string,
    createPostDto: CreatePostDto,
  ): Promise<Post> {
    const post = await this.postRepository.createPost({
      ...createPostDto,
      author: { id: userId },
    });
    if (!post) {
      throw new NotFoundException('Post not created');
    }
    return post;
  }

  async getAllPosts(id: string): Promise<Post[]> {
    const posts = await this.postRepository.getAllPosts(id);
    if (!posts) {
      throw new NotFoundException('Posts not found');
    }
    return posts;
  }

  async update(
    postId: string,
    userId: string,
    dto: UpdatePostDto,
  ): Promise<Post | null> {
    return await this.postRepository.updatePost(postId, userId, dto);
  }

  async remove(postId: string): Promise<void> {
    const post = await this.postRepository.findById(postId);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    await this.postRepository.softDelete(postId);
  }

  async restore(postId: string): Promise<void> {
    const post = await this.postRepository.findById(postId);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    await this.postRepository.restore(postId);
  }

  async getPostsWithRelations(page: number = 1, limit: number = 10) {
    return await this.postRepository.getPostsWithRelations(page, limit);
  }

  async incrementPostViews(postId: string): Promise<void> {
    return await this.postRepository.incrementViews(postId);
  }

  async getTotalPostsCount(authorId): Promise<number> {
    return await this.postRepository.count(authorId);
  }

  async getRelatedPosts(topicId: string, postId: string): Promise<Post[]> {
    return await this.postRepository.getRelatedPosts(topicId, postId);
  }

  async findPostsByTopic(topicSlug: string): Promise<Post[]> {
}
