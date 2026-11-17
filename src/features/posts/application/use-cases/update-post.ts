import type { Post } from '../../domain/entities/post';

import type {
  PostRepository,
  UpdatePostInput,
} from '../../domain/repositories/post-repository';

export class UpdatePost {
  constructor(
    private readonly postRepository: PostRepository,
  ) {}

  async execute(
    id: number,
    input: UpdatePostInput,
  ): Promise<Post> {
    if (!Number.isSafeInteger(id) || id <= 0) {
      throw new Error('O ID do post deve ser um número inteiro positivo.');
    }

    const title = input.title?.trim();
    const content = input.content?.trim();

    if (title === undefined && content === undefined) {
      throw new Error('Informe pelo menos um campo para atualizar.');
    }

    if (title !== undefined && title.length === 0) {
      throw new Error('O título do post não pode ficar vazio.');
    }

    if (content !== undefined && content.length === 0) {
      throw new Error('O conteúdo do post não pode ficar vazio.');
    }

    return this.postRepository.update(id, {
      ...(title !== undefined && { title }),
      ...(content !== undefined && { content }),
    });
  }
}