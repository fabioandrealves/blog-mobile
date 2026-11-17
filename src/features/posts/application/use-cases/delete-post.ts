import type { PostRepository } from '../../domain/repositories/post-repository';

export class DeletePost {
  constructor(
    private readonly postRepository: PostRepository,
  ) {}

  async execute(id: number): Promise<void> {
    if (!Number.isSafeInteger(id) || id <= 0) {
      throw new Error('O ID do post deve ser um número inteiro positivo.');
    }

    await this.postRepository.delete(id);
  }
}