import type { Post } from '../entities/post';

export interface CreatePostInput {
  title: string;
  content: string;
}

export interface UpdatePostInput {
  title?: string;
  content?: string;
}

export interface PostRepository {
  list(): Promise<Post[]>;

  getById(id: number): Promise<Post>;

  listMyPosts(): Promise<Post[]>;

  create(input: CreatePostInput): Promise<Post>;

  update(
    id: number,
    input: UpdatePostInput,
  ): Promise<Post>;

  delete(id: number): Promise<void>;
}