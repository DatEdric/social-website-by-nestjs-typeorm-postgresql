import { Membership } from 'src/common/enums/membership.enum';
import { Privacy } from 'src/common/enums/privacy.enum';
import { UserRole } from 'src/common/enums/user-role.enum';
import { Comment } from 'src/modules/comments/entities/comment.entity';
import { Follow } from 'src/modules/friends/entities/follows.entity';
import { Friend } from 'src/modules/friends/entities/friend.entity';
import { Notification } from 'src/modules/notifications/entities/notification.entity';
import { NotificationSetting } from 'src/modules/notifications/entities/notifications-setting.entity';
import { Post } from 'src/modules/posts/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  full_name: string;

  @Column()
  bio: string;

  @Column()
  avatar_url: string;

  @Column()
  followers_count: number;

  @Column()
  following_count: number;

  @Column({ type: 'enum', enum: Membership, default: Membership.reader })
  membership_status: Membership;

  @Column()
  social_link: string;

  @Column()
  address: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.MEMBER })
  role: UserRole;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;

  @Column({ name: 'is_deleted', type: 'boolean', default: false })
  isDeleted: boolean;

  @Column({ type: 'enum', enum: Privacy, default: Privacy.PUBLIC })
  privacy: Privacy;

  //relation
  @OneToMany(() => Post, (post) => post.author, { cascade: true })
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Friend, (friend) => friend.sender)
  sentFriendRequests: Friend[];

  @OneToMany(() => Friend, (friend) => friend.receiver)
  receivedFriendRequests: Friend[];

  @OneToMany(() => Follow, (follow) => follow.follower)
  following: Follow[];

  @OneToMany(() => Follow, (follow) => follow.following)
  followers: Follow[];

  @OneToMany(() => Notification, (notification) => notification.sender)
  sentNotifications: Notification[];

  @OneToMany(() => Notification, (notification) => notification.receiver)
  receivedNotifications: Notification[];

  @OneToMany(
    () => NotificationSetting,
    (notificationSetting) => notificationSetting.user,
  )
  notificationSettings: NotificationSetting[];
}
