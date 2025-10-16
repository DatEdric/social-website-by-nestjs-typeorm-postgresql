import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { MakeFiendStatus } from 'src/common/enums/status-make-friend.enum';

@Entity('friend')
@Unique(['sender', 'receiver'])
export class Friend {
  @PrimaryGeneratedColumn('uuid')
  friend_id: string;

  @ManyToOne(() => User, (user) => user.sentFriendRequests, {
    onDelete: 'CASCADE',
  })
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedFriendRequests, {
    onDelete: 'CASCADE',
  })
  receiver: User;

  @Column({
    type: 'enum',
    enum: MakeFiendStatus,
    default: MakeFiendStatus.PENDING,
  })
  status: MakeFiendStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
