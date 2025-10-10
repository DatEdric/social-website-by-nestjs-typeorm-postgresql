import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from './post.entity';

@Entity({ name: 'topic' })
export class Topic {
  @PrimaryGeneratedColumn('uuid')
  topic_id: string;

  @Column({ length: 100, nullable: false })
  topic_name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ unique: true })
  slug: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;

  @Column({ name: 'is_deleted', type: 'boolean', default: false })
  is_deleted: boolean;

  //relation
  @OneToMany(() => Post, (post) => post.topic)
  posts: Post[];
}
