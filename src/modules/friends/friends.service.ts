import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { FriendRepository } from './repositories/friends.repository';
import { User } from '../user/entities/user.entity';
import { Friend } from './entities/friend.entity';
import { Follow } from './entities/follows.entity';

@Injectable()
export class FriendService {
  constructor(private readonly friendRepository: FriendRepository) {}

  async sendFriendRequest(sender: User, receiver: User): Promise<Friend> {
    const result = await this.friendRepository.sendFriendRequest(
      sender,
      receiver,
    );

    if (!result) {
      throw new BadRequestException('Không thể gửi lời mời kết bạn');
    }

    return result;
  }

  async acceptFriendRequest(friendId: string, user: User): Promise<Friend> {
    const result = await this.friendRepository.acceptFriendRequest(
      friendId,
      user,
    );

    if (!result) {
      throw new NotFoundException('Không tìm thấy lời mời kết bạn');
    }

    return result;
  }

  async rejectFriendRequest(friendId: string, user: User): Promise<boolean> {
    const result = await this.friendRepository.rejectFriendRequest(
      friendId,
      user,
    );

    if (!result) {
      throw new NotFoundException('Không thể từ chối lời mời kết bạn');
    }

    return result;
  }

  async unfriend(user: User, friendId: string): Promise<boolean> {
    const result = await this.friendRepository.unfriend(user, friendId);

    if (!result) {
      throw new NotFoundException('Không tồn tại quan hệ bạn bè để hủy');
    }

    return result;
  }

  async followUser(follower: User, following: User): Promise<Follow> {
    const result = await this.friendRepository.followUser(follower, following);

    if (!result) {
      throw new BadRequestException('Không thể theo dõi người này');
    }

    return result;
  }

  async unfollowUser(follower: User, following: User): Promise<boolean> {
    const result = await this.friendRepository.unfollowUser(
      follower,
      following,
    );

    if (!result) {
      throw new NotFoundException('Không thể bỏ theo dõi người này');
    }

    return result;
  }

  async getFriends(userId: string): Promise<User[]> {
    const friends = await this.friendRepository.getFriends(userId);

    if (!friends || friends.length === 0) {
      throw new NotFoundException('Không có bạn bè nào được tìm thấy');
    }

    return friends;
  }

  async suggestFriends(userId: string, limit = 5): Promise<User[]> {
    const suggestions = await this.friendRepository.suggestFriends(
      userId,
      limit,
    );

    if (!suggestions || suggestions.length === 0) {
      throw new NotFoundException('Không có đề xuất bạn bè nào');
    }

    return suggestions;
  }

  async getFollowers(userId: string): Promise<User[]> {
    const followers = await this.friendRepository.getFollowers(userId);

    if (!followers || followers.length === 0) {
      throw new NotFoundException('Không có người theo dõi nào');
    }

    return followers;
  }

  async getFollowing(userId: string): Promise<User[]> {
    const following = await this.friendRepository.getFollowing(userId);

    if (!following || following.length === 0) {
      throw new NotFoundException('Bạn chưa theo dõi ai');
    }

    return following;
  }
}
