import type { HttpClient } from '@/src/core/http/http-client';

import type { Post } from '../../domain/entities/post';

import type {
  CreatePostInput,
  PostRepository,
  UpdatePostInput,
} from '../../domain/repositories/post-repository';

import {
  toPost,
  type PostDto,
} from '../models/post-dto';

export class PostRepositoryImpl implements PostRepository {
  private readonly endpoint = '/posts';

  constructor(
    private readonly httpClient: HttpClient,
  ) {}

  async list(): Promise<Post[]> {
    const response = await this.httpClient.request<unknown>(
      this.endpoint,
      {
        method: 'GET',
        requiresAuth: false,
      },
    );

    const result = response as {
      data?: {
        posts?: PostDto[];
      };
      posts?: PostDto[];
    };

    const posts = Array.isArray(response)
      ? response as PostDto[]
      : result?.data?.posts ?? result?.posts;

    if (!Array.isArray(posts)) {
      throw new Error(
        'A API não retornou uma lista válida de posts.',
      );
    }

    return posts.map(toPost);
  }

  async getById(id: number): Promise<Post> {
    const response = await this.httpClient.request<PostDto>(
      `${this.endpoint}/${id}`,
      {
        method: 'GET',
        requiresAuth: false,
      },
    );

    return toPost(response.data.post);
  }

  async listMyPosts(): Promise<Post[]> {
    const response = await this.httpClient.request<unknown>(
      `${this.endpoint}/me`,
      {
        method: 'GET',
        requiresAuth: true,
      },
    );

    const data = response as {
      data?: {
        posts?: PostDto[];
      };
      posts?: PostDto[];
    };

    const posts = Array.isArray(response)
      ? response as PostDto[]
      : data.data?.posts ?? data.posts;

    if (!Array.isArray(posts)) {
      throw new Error(
        'A API não retornou uma lista válida de posts.',
      );
    }

    return posts.map(toPost);
  }

  async create(input: CreatePostInput): Promise<Post> {
    const response = await this.httpClient.request<PostDto>(
      this.endpoint,
      {
        method: 'POST',
        body: input,
        requiresAuth: true,
      },
    );

    return toPost(response.data.post);
  }

  async update(
    id: number,
    input: UpdatePostInput,
  ): Promise<Post> {
    const response = await this.httpClient.request<PostDto>(
      `${this.endpoint}/${id}`,
      {
        method: 'PUT',
        body: input,
        requiresAuth: true,
      },
    );

    return toPost(response.data.post);
  }

  async delete(id: number): Promise<void> {
    await this.httpClient.request<void>(
      `${this.endpoint}/${id}`,
      {
        method: 'DELETE',
        requiresAuth: true,
      },
    );
  }
}
