import type { Post } from '../../domain/entities/post';
import type { PostRepository } from '../../domain/repositories/post-repository';

export class ListPosts {
  constructor(
    private readonly postRepository: PostRepository,
  ) {}

  async execute(): Promise<Post[]> {
    return this.postRepository.list();
  }
}