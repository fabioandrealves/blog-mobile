import type { TokenStorage } from '../../../../core/storage/token-storage';
import type {
  AuthRepository,
  LoginInput,
  AuthSession,
} from '../../domain/repositories/auth-repository';

export class LoginUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly tokenStorage: TokenStorage,
  ) {}

  async execute(input: LoginInput): Promise<AuthSession> {
    const normalizedInput: LoginInput = {
      email: input.email.trim().toLowerCase(),
      password: input.password,
    };

    if (!normalizedInput.email || !normalizedInput.password) {
      throw new Error('Informe seu e-mail e sua senha.');
    }

    const session = await this.authRepository.login(normalizedInput);

    await this.tokenStorage.save(session.token);

    return session;
  }
}