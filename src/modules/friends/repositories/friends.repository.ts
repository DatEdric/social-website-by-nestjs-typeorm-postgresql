import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseRepository } from 'src/common/repositories/base-repository.repository';
import { User } from 'src/modules/user/entities/user.entity';
import { Friend } from '../entities/friend.entity';
import { Follow } from '../entities/follows.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { read } from 'fs';
import { MakeFiendStatus } from 'src/common/enums/status-make-friend.enum';

@Injectable()
export class FriendRepository extends BaseRepository<Friend> {
  constructor(
    @InjectRepository(Friend)
    protected readonly repository: Repository<Friend>,
    @InjectRepository(Follow)
    protected readonly followRepository: Repository<Follow>,
    @InjectRepository(User)
    protected readonly userRepository: Repository<User>,
  ) {
    super(repository);
  }

  async sendFriendRequest(sender: User, receiver: User): Promise<Friend> {
    if (sender.id === receiver.id) {
      throw new BadRequestException(
        'Không thể gửi lời mời kết bạn cho chính mình',
      );
    }

    const existing = await this.repository.findOne({
      where: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    });

    if (existing) {
      throw new BadRequestException('Đã tồn tại quan hệ kết bạn hoặc lời mời');
    }

    const request = this.repository.create({
      sender,
      receiver,
      status: MakeFiendStatus.PENDING,
    });

    return await this.save(request);
  }

  async acceptFriendRequest(friendId: string, user: User): Promise<Friend> {
    const request = await this.repository.findOne({
      where: { friend_id: friendId },
      relations: ['sender', 'receiver'],
    });

    if (!request) throw new NotFoundException('Lời mời kết bạn không tồn tại');
    if (request.receiver.id !== user.id)
      throw new BadRequestException('Bạn không có quyền chấp nhận lời mời này');

    request.status = MakeFiendStatus.ACCEPTED;
    return await this.save(request);
  }

  async rejectFriendRequest(friendId: string, user: User): Promise<boolean> {
    const request = await this.repository.findOne({
      where: { friend_id: friendId },
      relations: ['receiver'],
    });

    if (!request) throw new NotFoundException('Lời mời kết bạn không tồn tại');
    if (request.receiver.id !== user.id)
      throw new BadRequestException(
        'Không thể từ chối lời mời không gửi cho bạn',
      );

    await this.repository.delete(friendId);
    return true;
  }

  async unfriend(user: User, friendId: string): Promise<boolean> {
    const relation = await this.repository.findOne({
      where: [
        {
          sender: user,
          receiver: { id: friendId },
          status: MakeFiendStatus.ACCEPTED,
        },
        {
          sender: { id: friendId },
          receiver: user,
          status: MakeFiendStatus.ACCEPTED,
        },
      ],
    });

    if (!relation) throw new NotFoundException('Không tồn tại quan hệ bạn bè');

    await this.repository.remove(relation);
    return true;
  }

  async followUser(follower: User, following: User): Promise<Follow> {
    if (follower.id === following.id)
      throw new BadRequestException('Không thể theo dõi chính mình');

    const exist = await this.followRepository.findOne({
      where: { follower, following },
    });

    if (exist) throw new BadRequestException('Đã theo dõi người này');

    const follow = this.followRepository.create({
      follower,
      following,
    });

    return await this.followRepository.save(follow);
  }

  async unfollowUser(follower: User, following: User): Promise<boolean> {
    const follow = await this.followRepository.findOne({
      where: { follower, following },
    });

    if (!follow) throw new NotFoundException('Bạn chưa theo dõi người này');

    await this.followRepository.remove(follow);
    return true;
  }

  async getFriends(userId: string): Promise<User[]> {
    const friends = await this.repository
      .createQueryBuilder('friend')
      .leftJoinAndSelect('friend.sender', 'sender')
      .leftJoinAndSelect('friend.receiver', 'receiver')
      .where('(sender.id = :userId OR receiver.id = :userId)', { userId })
      .andWhere('friend.status = :status', { status: 'accepted' })
      .getMany();

    return friends.map((f) => (f.sender.id === userId ? f.receiver : f.sender));
  }

  async suggestFriends(userId: string, limit = 5): Promise<User[]> {
    const mutuals = await this.userRepository
      .createQueryBuilder('user')
      .leftJoin('user.sentFriendRequests', 'sent')
      .leftJoin('user.receivedFriendRequests', 'received')
      .where('user.id != :userId', { userId })
      .andWhere(
        `user.id NOT IN (
          SELECT CASE
            WHEN f.sender_id = :userId THEN f.receiver_id
            WHEN f.receiver_id = :userId THEN f.sender_id
          END
          FROM friend f
          WHERE f.status = 'accepted'
        )`,
        { userId },
      )
      .limit(limit)
      .getMany();

    return mutuals;
  }

  async getFollowers(userId: string): Promise<User[]> {
    const followers = await this.followRepository.find({
      where: { following: { id: userId } },
      relations: ['follower'],
    });
    return followers.map((f) => f.follower);
  }

  async getFollowing(userId: string): Promise<User[]> {
    const following = await this.followRepository.find({
      where: { follower: { id: userId } },
      relations: ['following'],
    });
    return following.map((f) => f.following);
  }
}
