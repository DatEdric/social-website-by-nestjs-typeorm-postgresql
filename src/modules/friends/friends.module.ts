import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from './entities/friend.entity';
import { Follow } from './entities/follows.entity';
import { FriendRepository } from './repositories/friends.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Friend, Follow])],
  controllers: [FriendsController],
  providers: [FriendsService, FriendRepository],
  exports: [FriendsService, FriendRepository],
})
export class FriendsModule {}
