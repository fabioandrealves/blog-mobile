import type { TokenStorage } from '../../../../core/storage/token-storage';

export class LogoutUseCase {
  constructor(
    private readonly tokenStorage: TokenStorage,
  ) {}

  execute(): Promise<void> {
    return this.tokenStorage.clear();
  }
}