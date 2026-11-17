import type { User } from '../../domain/entities/user';
import type { AuthRepository } from '../../domain/repositories/auth-repository';

export class GetCurrentUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
  ) {}

  execute(): Promise<User> {
    return this.authRepository.getCurrentUser();
  }
}