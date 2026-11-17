import type { Post } from '../../domain/entities/post';

export interface PostDto {
  id: number;
  userId: number;
  title: string;
  content: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
}

export function toPost(dto: PostDto): Post {
  return {
    id: dto.id,
    userId: dto.userId,
    title: dto.title,
    content: dto.content,
    authorName: dto.authorName,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
}