import type {
  Comment,
  CreateCommentInput,
} from '../../domain/entities/comment';

import type { CommentRepository } from '../../domain/repositories/comment-repository';

export class CreateComment {
  constructor(
    private readonly repository: CommentRepository,
  ) {}

  execute(input: CreateCommentInput): Promise<Comment> {
    const content = input.content.trim();

    if (!Number.isSafeInteger(input.postId) || input.postId <= 0) {
      throw new Error('ID da publicação inválido.');
    }

    if (!content) {
      throw new Error('Digite um comentário.');
    }

    return this.repository.create({
      postId: input.postId,
      content,
    });
  }
}