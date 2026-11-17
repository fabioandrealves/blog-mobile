import type { CommentRepository } from '../../domain/repositories/comment-repository';

export class DeleteComment {
  constructor(
    private readonly repository: CommentRepository,
  ) {}

  execute(id: number): Promise<void> {
    if (!Number.isSafeInteger(id) || id <= 0) {
      throw new Error('ID do comentário inválido.');
    }

    return this.repository.delete(id);
  }
}