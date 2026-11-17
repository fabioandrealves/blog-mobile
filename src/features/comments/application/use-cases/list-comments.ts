import type { Comment } from '../../domain/entities/comment';
import type { CommentRepository } from '../../domain/repositories/comment-repository';

export class ListComments {
  constructor(
    private readonly repository: CommentRepository,
  ) {}

  execute(postId: number): Promise<Comment[]> {
    if (!Number.isSafeInteger(postId) || postId <= 0) {
      throw new Error('ID da publicação inválido.');
    }

    return this.repository.list(postId);
  }
}