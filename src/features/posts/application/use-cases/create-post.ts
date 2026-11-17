import type { Post } from '../../domain/entities/post';

import type {
  CreatePostInput,
  PostRepository,
} from '../../domain/repositories/post-repository';

export class CreatePost {
  constructor(
    private readonly postRepository: PostRepository,
  ) {}

  async execute(input: CreatePostInput): Promise<Post> {
    return this.postRepository.create(input);
  }
}