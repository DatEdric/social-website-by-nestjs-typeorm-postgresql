import {
  Controller,
  Post,
  Delete,
  Param,
  Get,
  Body,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SendFriendRequestDto } from './dto/send-friend-request.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { UserSummaryDto } from './dto/user-summary.dto';
import { FriendService } from './friends.service';
import { FriendResponseDto } from './dto/friend-respone.dto';
import { FollowResponseDto } from './dto/follow-respone.dto';

@ApiTags('Friend / Follow')
@Controller('friends')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Post('request')
  @ApiOperation({ summary: 'Gửi lời mời kết bạn' })
  @ApiResponse({ status: 201, type: FriendResponseDto })
  async sendFriendRequest(
    @CurrentUser() user: User,
    @Body() dto: SendFriendRequestDto,
  ): Promise<FriendResponseDto> {
    const receiver = { id: dto.receiver_id } as User;
    const friend = await this.friendService.sendFriendRequest(user, receiver);
    return FriendResponseDto.fromEntity(friend);
  }

  @Post('accept/:friendId')
  @ApiOperation({ summary: 'Chấp nhận lời mời kết bạn' })
  @ApiResponse({ status: 200, type: FriendResponseDto })
  async acceptFriendRequest(
    @CurrentUser() user: User,
    @Param('friendId') friendId: string,
  ): Promise<FriendResponseDto> {
    const friend = await this.friendService.acceptFriendRequest(friendId, user);
    return FriendResponseDto.fromEntity(friend);
  }

  @Delete('reject/:friendId')
  @ApiOperation({ summary: 'Từ chối lời mời kết bạn' })
  @ApiResponse({ status: 200, description: 'Lời mời đã bị từ chối' })
  async rejectFriendRequest(
    @CurrentUser() user: User,
    @Param('friendId') friendId: string,
  ): Promise<{ success: boolean }> {
    const result = await this.friendService.rejectFriendRequest(friendId, user);
    return { success: result };
  }

  @Delete(':friendId')
  @ApiOperation({ summary: 'Hủy kết bạn' })
  @ApiResponse({ status: 200, description: 'Đã hủy kết bạn thành công' })
  async unfriend(
    @CurrentUser() user: User,
    @Param('friendId') friendId: string,
  ): Promise<{ success: boolean }> {
    const result = await this.friendService.unfriend(user, friendId);
    return { success: result };
  }

  @Post('follow/:userId')
  @ApiOperation({ summary: 'Theo dõi người dùng' })
  @ApiResponse({ status: 201, type: FollowResponseDto })
  async followUser(
    @CurrentUser() follower: User,
    @Param('userId') userId: string,
  ): Promise<FollowResponseDto> {
    const following = { id: userId } as User;
    const follow = await this.friendService.followUser(follower, following);
    return FollowResponseDto.fromEntity(follow);
  }

  @Delete('unfollow/:userId')
  @ApiOperation({ summary: 'Bỏ theo dõi người dùng' })
  @ApiResponse({ status: 200, description: 'Đã bỏ theo dõi thành công' })
  async unfollowUser(
    @CurrentUser() follower: User,
    @Param('userId') userId: string,
  ): Promise<{ success: boolean }> {
    const following = { id: userId } as User;
    const result = await this.friendService.unfollowUser(follower, following);
    return { success: result };
  }

  @Get('list/:userId')
  @ApiOperation({ summary: 'Lấy danh sách bạn bè của người dùng' })
  @ApiResponse({ status: 200, type: [UserSummaryDto] })
  async getFriends(@Param('userId') userId: string): Promise<UserSummaryDto[]> {
    const friends = await this.friendService.getFriends(userId);
    return friends.map((f) => UserSummaryDto.fromEntity(f));
  }

  @Get('suggest')
  @ApiOperation({ summary: 'Gợi ý bạn bè (dựa theo bạn chung hoặc sở thích)' })
  @ApiResponse({ status: 200, type: [UserSummaryDto] })
  async suggestFriends(
    @CurrentUser() user: User,
    @Query('limit') limit = 5,
  ): Promise<UserSummaryDto[]> {
    const suggestions = await this.friendService.suggestFriends(
      user.id,
      +limit,
    );
    return suggestions.map((s) => UserSummaryDto.fromEntity(s));
  }

  @Get('followers/:userId')
  @ApiOperation({ summary: 'Danh sách người theo dõi bạn' })
  @ApiResponse({ status: 200, type: [UserSummaryDto] })
  async getFollowers(
    @Param('userId') userId: string,
  ): Promise<UserSummaryDto[]> {
    const followers = await this.friendService.getFollowers(userId);
    return followers.map((f) => UserSummaryDto.fromEntity(f));
  }

  @Get('following/:userId')
  @ApiOperation({ summary: 'Danh sách người bạn đang theo dõi' })
  @ApiResponse({ status: 200, type: [UserSummaryDto] })
  async getFollowing(
    @Param('userId') userId: string,
  ): Promise<UserSummaryDto[]> {
    const following = await this.friendService.getFollowing(userId);
    return following.map((f) => UserSummaryDto.fromEntity(f));
  }
}
