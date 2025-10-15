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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
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
import { PaginatedResponseDto } from '../../common/dtos/paginated-response.dto';

@ApiBearerAuth('BearerAuth')
// @UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('all-posts')
  @ApiOperation({ summary: 'Get all posts for the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'List of posts for the authenticated user',
    type: [GetPostDto],
  })
  @Roles(UserRole.AUTHOR)
  @Serialize(GetPostDto)
  async getAllPosts(@Request() req: AuthRequest): Promise<GetPostDto[]> {
    const posts = await this.postsService.getAllPosts(req.user.id);
    return posts;
  }

  @Get(':post_id')
  @ApiOperation({ summary: 'Get a post by ID' })
  @ApiParam({ name: 'post_id', description: 'Id of post', type: String })
  @ApiResponse({
    status: 200,
    description: 'The post has been successfully retrieved.',
    type: GetPostDto,
  })
  @Roles(UserRole.AUTHOR)
  @Serialize(GetPostDto)
  async getOnePost(@Param('post_id') post_id: string): Promise<GetPostDto> {
    return await this.postsService.findOnePost(post_id);
  }

  @Post()
  @Roles(UserRole.AUTHOR)
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created.',
    type: GetPostDto,
  })
  async createPost(
    @CurrentUser() user: User,
    @Body() createPostDto: CreatePostDto,
  ): Promise<GetPostDto> {
    return await this.postsService.createNewPost(user.id, createPostDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a post by ID' })
  @ApiParam({ name: 'id', description: 'ID của bài viết', type: String })
  @ApiResponse({
    status: 200,
    description: 'The post has been successfully updated.',
    type: GetPostDto,
  })
  @Roles(UserRole.AUTHOR)
  async updatePost(
    @CurrentUser() user: User,
    @Param('id') postId: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<any> {
    return await this.postsService.update(postId, user.id, updatePostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post by ID' })
  @ApiParam({ name: 'id', description: 'ID of post', type: String })
  @ApiResponse({
    status: 204,
    description: 'The post has been successfully deleted.',
  })
  @Roles(UserRole.AUTHOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePost(
    @CurrentUser() user: User,
    @Param('id', ParseUUIDPipe) postId: string,
  ): Promise<void> {
    return await this.postsService.remove(postId);
  }

  @Put('restore/:id')
  @ApiOperation({ summary: 'Restore a soft-deleted post by ID' })
  @ApiParam({ name: 'id', description: 'Id of post', type: String })
  @ApiResponse({
    status: 200,
    description: 'The post has been successfully restored.',
  })
  @Roles(UserRole.AUTHOR)
  @HttpCode(HttpStatus.OK)
  async restorePost(@Param('id', ParseUUIDPipe) postId: string): Promise<void> {
    return await this.postsService.restore(postId);
  }

  @Get()
  @ApiOperation({ summary: 'Get paginated list of posts' })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of posts',
    type: PaginatedResponseDto,
  })
  // @Roles(UserRole.AUTHOR, UserRole.READER)
  @Serialize(PaginatedResponseDto)
  async getAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ): Promise<PaginatedResponseDto<GetPostDto>> {
    return await this.postsService.getPostsWithRelations(page, limit);
  }

  @Get('topic/:slug')
  @ApiOperation({ summary: 'Get posts by topic slug' })
  @ApiResponse({
    status: 200,
    description: 'List of posts for the given topic',
    type: [GetPostDto],
  })
  async findbyTopic(@Param('slug') topicSlug: string): Promise<GetPostDto[]> {
    return await this.postsService.findPostsByTopic(topicSlug);
  }

  @Get('status/:status')
  @ApiOperation({ summary: 'Get posts by status' })
  @ApiParam({ name: 'status', description: 'status of post' })
  @ApiResponse({
    status: 200,
    description: 'List of posts with the given status',
    type: [GetPostDto],
  })
  async findByStatus(@Param('status') status: string): Promise<GetPostDto[]> {
    return await this.postsService.findPostsByStatus(status);
  }

  @Get('/popular')
  @ApiOperation({ summary: 'Get popular posts' })
  @ApiResponse({
    status: 200,
    description: 'List of popular posts',
    type: [GetPostDto],
  })
  async getPoppular(
    @Query('limit', ParseIntPipe) limit: number,
  ): Promise<GetPostDto[]> {
    return await this.postsService.getPopularPosts(limit);
  }

  @Get('author/:authorId')
  @ApiOperation({ summary: 'Get posts by author ID with pagination' })
  @ApiParam({ name: 'authorId', type: String })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of posts for the given author',
    type: PaginatedResponseDto,
  })
  async getAuthorPosts(
    @Param('authorId', ParseUUIDPipe) authorId: string,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ): Promise<PaginatedResponseDto<GetPostDto>> {
    return await this.postsService.getAuthorPosts(authorId, page, limit);
  }

  @Get('/drafts')
  @ApiOperation({ summary: 'Get draft posts for the authenticated user' })
  @ApiParam({
    name: 'author_id',
    description: 'Id of author in a post',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'List of draft posts for the authenticated user',
    type: [GetPostDto],
  })
  async getDrafts(@CurrentUser('id') userId: string): Promise<GetPostDto[]> {
    return await this.postsService.getDrafts(userId);
  }

  @Get('author/:author-id/count')
  @ApiOperation({ summary: 'count the number of posts by the author' })
  @ApiParam({
    name: 'author-id',
    description: 'Id of author in a post',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'number of posts', type: Number })
  async getTotalPostsCount(
    @Param('author-id', ParseUUIDPipe) authorId: string,
  ): Promise<number> {
    return await this.postsService.getTotalPostsCount(authorId);
  }

  @Put(':id/incerment-views')
  @ApiOperation({ summary: 'increment views for the post' })
  @ApiParam({ name: 'id', description: 'ID of a post' })
  @ApiResponse({ status: 200, description: 'views has increased' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async incrementPostViews(
    @Param('id', ParseUUIDPipe) postId: string,
  ): Promise<void> {
    return await this.postsService.incrementPostViews(postId);
  }

  @Get('related/:topicId/:postId')
  @ApiOperation({ summary: 'Get related articles (same topic)' })
  @ApiParam({ name: 'id', description: 'current post ID' })
  @ApiParam({ name: 'topicId', description: 'ID topic' })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 5 })
  @ApiResponse({ status: 200, type: [GetPostDto] })
  async getRelatedPosts(
    @Param('topicId', ParseUUIDPipe) topicId: string,
    @Param('postId', ParseUUIDPipe) postId: string,
  ): Promise<GetPostDto[]> {
    return await this.postsService.getRelatedPosts(topicId, postId);
  }

  @Get('/search')
  @ApiOperation({ summary: 'search post by keyword ' })
  @ApiQuery({ name: 'q', required: true, description: 'keyword to search' })
  @ApiResponse({ status: 200, type: [GetPostDto] })
  async search(@Query('q') searchTerm: string): Promise<GetPostDto[] | null> {
    return await this.postsService.searchPosts(searchTerm);
  }
}
