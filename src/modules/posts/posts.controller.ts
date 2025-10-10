import {
  Body,
  Controller,
  Get,
  Param,
  Post,
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
    @Request() req: AuthRequest,
    @Body() createPostDto: CreatePostDto,
  ): Promise<any> {
    return await this.postsService.createNewPost(createPostDto, req.user.id);
  }
}
