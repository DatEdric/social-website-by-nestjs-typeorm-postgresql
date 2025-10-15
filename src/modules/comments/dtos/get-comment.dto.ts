export class GetCommentDto {
  comment_id: string;
  content: string;
  views: number;
  likes_count: number;
  createdAt: Date;
  updated_at: Date;

  // Thông tin user
  user: {
    user_id: string;
    username: string;
    email?: string;
    avatar?: string;
  };

  // Thông tin post (optional - nếu cần)
  post?: {
    post_id: string;
    title: string;
  };

  constructor(partial: Partial<GetCommentDto>) {
    Object.assign(this, partial);
  }
}
