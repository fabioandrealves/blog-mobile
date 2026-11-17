
import type { Comment } from '../../domain/entities/comment';

export interface CommentDto {
  id: number;
  postId: number;
  userId: number;
  content: string;
  authorName?: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: number;
    name: string;
  };
}

export function toComment(dto: CommentDto): Comment {
  return {
    id: dto.id,
    postId: dto.postId,
    userId: dto.userId,
    content: dto.content,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
    user: dto.user ?? {
      id: dto.userId,
      name: dto.authorName ?? 'Usuário',
    },
  };
}