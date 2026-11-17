import type { User } from '../../domain/entities/user';
import type {
  AuthRepository,
  RegisterInput,
} from '../../domain/repositories/auth-repository';

export class RegisterUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
  ) {}

  async execute(input: RegisterInput): Promise<User> {
    const name = input.name.trim();
    const email = input.email.trim().toLowerCase();

    if (!name || !email || !input.password) {
      throw new Error('Preencha todos os campos obrigatórios.');
    }

    if (input.password.length < 6) {
      throw new Error('A senha deve ter pelo menos 6 caracteres.');
    }

    return this.authRepository.register({
      ...input,
      name,
      email,
    });
  }
}