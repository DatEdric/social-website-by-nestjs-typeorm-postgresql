import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('follow')
export class Follow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.following)
  follower: User;

  @ManyToOne(() => User, (user) => user.followers)
  following: User;

  @CreateDateColumn()
  created_at: Date;
}
