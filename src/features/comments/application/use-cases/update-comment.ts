import type {
  Comment,
  UpdateCommentInput,
} from '../../domain/entities/comment';

import type { CommentRepository } from '../../domain/repositories/comment-repository';

export class UpdateComment {
  constructor(
    private readonly repository: CommentRepository,
  ) {}

  execute(
    id: number,
    input: UpdateCommentInput,
  ): Promise<Comment> {
    const content = input.content.trim();

    if (!Number.isSafeInteger(id) || id <= 0) {
      throw new Error('ID do comentário inválido.');
    }

    if (!content) {
      throw new Error('O comentário não pode ficar vazio.');
    }

    return this.repository.update(id, { content });
  }
}