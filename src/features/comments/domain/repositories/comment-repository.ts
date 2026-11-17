import type {
  Comment,
  CreateCommentInput,
  UpdateCommentInput,
} from '../entities/comment';

export interface CommentRepository {
  list(postId: number): Promise<Comment[]>;

  create(input: CreateCommentInput): Promise<Comment>;

  update(
    id: number,
    input: UpdateCommentInput,
  ): Promise<Comment>;

  delete(id: number): Promise<void>;
}