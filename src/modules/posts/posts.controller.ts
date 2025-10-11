import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Serialize } from 'src/common/decorators/serialize.decorator';
import { UserRole } from 'src/common/enums/user-role.enum';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AuthRequest } from 'src/common/interfaces/auth-request.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostDto } from './dto/get-post.dto';
import { PostsService } from './posts.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { Http } from 'winston/lib/winston/transports';
import { Post, Post } from './entities/post.entity';

@ApiBearerAuth('BearerAuth')
@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('all-posts')
  @Roles(UserRole.AUTHOR)
  @Serialize(GetPostDto)
  async getAllPosts(@Request() req: AuthRequest): Promise<GetPostDto[]> {
    console.log(req.user.id);

    const posts = await this.postsService.getAllPosts(req.user.id);
    return posts;
  }

  @Get(':post_id')
  @Roles(UserRole.AUTHOR)
  @Serialize(GetPostDto)
  async getOnePost(@Param('post_id') post_id: string): Promise<GetPostDto> {
    return await this.postsService.findOnePost(post_id);
  }

  @Post()
  @Roles(UserRole.AUTHOR)
  async createPost(
    @CurrentUser() user: User,
    @Body() createPostDto: CreatePostDto,
  ): Promise<any> {
    return await this.postsService.createNewPost(user.id, createPostDto);
  }

  @Put(':id')
  async updatePost(
    @CurrentUser() user: User,
    @Param('id') postId: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<any> {
    return await this.postsService.update(postId, user.id, updatePostDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePost(
    @CurrentUser() user: User,
    @Param('id', ParseUUIDPipe) postId: string,
  ): Promise<void> {
    return await this.postsService.remove(postId);
  }

  @Put('restore/:id')
  async restorePost(@Param('id', ParseUUIDPipe) postId: string): Promise<void> {
    return await this.postsService.restore(postId);
  }

  @Get()
  async getAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ): Promise<GetPostDto[]> {
    return await this.postsService.getPostsWithRelations(page, limit);
  }

  @Get('topic/:slug')
  async findbyTopic(@Param('slug') topicSlug: string) {
    return await this.postsService.findPostsByTopic(topicSlug);
  }
}
