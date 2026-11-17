import type { Post } from '../../domain/entities/post';
import type { PostRepository } from '../../domain/repositories/post-repository';

export class GetPostById {
  constructor(
    private readonly postRepository: PostRepository,
  ) {}

  async execute(id: number): Promise<Post> {
    if (!Number.isSafeInteger(id) || id <= 0) {
      throw new Error('O ID do post deve ser um número inteiro positivo.');
    }

    return this.postRepository.getById(id);
  }
}