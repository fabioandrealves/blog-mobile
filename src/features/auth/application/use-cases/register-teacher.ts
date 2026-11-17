import type { User } from '../../domain/entities/user';
import type { RegisterTeacherInput } from '../../domain/repositories/auth-repository';
import type { AuthRepository } from '../../domain/repositories/auth-repository';

export class RegisterTeacherUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  execute(input: RegisterTeacherInput): Promise<User> {
    return this.authRepository.registerTeacher(input);
  }
}