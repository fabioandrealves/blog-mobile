import type { CreateCommentInput } from '../../domain/entities/comment';

import type { CommentDto } from '../models/comment-dto';

import type { CommentApiContract } from './comment-repository-impl';

type CommentResponse = {
  message?: string;
  data?: {
    comment?: CommentDto;
    comments?: CommentDto[];
  };
};

export const commentApiContract: CommentApiContract = {
  listPath(postId: number): string {
    return `/posts/${postId}/comments`;
  },

  createPath(postId: number): string {
    return `/posts/${postId}/comments`;
  },

  updatePath(commentId: number): string {
    return `/comments/${commentId}`;
  },

  deletePath(commentId: number): string {
    return `/comments/${commentId}`;
  },

  createBody(input: CreateCommentInput): unknown {
    return {
      content: input.content,
    };
  },

  readOne(response: unknown): CommentDto {
    const result = response as CommentResponse;

    const comment = result?.data?.comment;

    if (!comment || !Number.isSafeInteger(Number(comment.id))) {
      throw new Error(
        'A API não retornou um comentário válido.',
      );
    }

    return comment;
  },

  readMany(response: unknown): CommentDto[] {
    const result = response as CommentResponse;

    const comments = result?.data?.comments;

    if (!Array.isArray(comments)) {
      throw new Error(
        'A API não retornou uma lista de comentários válida.',
      );
    }

    return comments;
  },
}