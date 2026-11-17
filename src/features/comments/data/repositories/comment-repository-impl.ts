
import type { HttpClient } from '@/src/core/http/http-client';

import type {
  Comment,
  CreateCommentInput,
  UpdateCommentInput,
} from '../../domain/entities/comment';

import type { CommentRepository } from '../../domain/repositories/comment-repository';

import {
  toComment,
  type CommentDto,
} from '../models/comment-dto';

export interface CommentApiContract {
  listPath(postId: number): string;
  createPath(postId: number): string;
  updatePath(commentId: number): string;
  deletePath(commentId: number): string;

  createBody(input: CreateCommentInput): unknown;

  readOne(response: unknown): CommentDto;
  readMany(response: unknown): CommentDto[];
}

export class CommentRepositoryImpl implements CommentRepository {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly api: CommentApiContract,
  ) {}

  async list(postId: number): Promise<Comment[]> {
    const response = await this.httpClient.request<unknown>(
      this.api.listPath(postId),
      {
        method: 'GET',
        requiresAuth: false,
      },
    );

    return this.api.readMany(response).map(toComment);
  }

  async create(input: CreateCommentInput): Promise<Comment> {
    const response = await this.httpClient.request<unknown>(
      this.api.createPath(input.postId),
      {
        method: 'POST',
        requiresAuth: true,
        body: this.api.createBody(input),
      },
    );

    return toComment(this.api.readOne(response));
  }

  async update(
    id: number,
    input: UpdateCommentInput,
  ): Promise<Comment> {
    const response = await this.httpClient.request<unknown>(
      this.api.updatePath(id),
      {
        method: 'PUT',
        requiresAuth: true,
        body: input,
      },
    );

    return toComment(this.api.readOne(response));
  }

  async delete(id: number): Promise<void> {
//         Alert.alert('[DELETE COMMENT] ID:', id);
//         Alert.alert('[DELETE COMMENT] PATH:', this.api.deletePath(id));
    await this.httpClient.request<void>(
      this.api.deletePath(id),
      {
        method: 'DELETE',
        requiresAuth: true,
      },
    );
  }
}