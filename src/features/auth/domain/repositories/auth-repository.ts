import type { User } from '../entities/user';

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface RegisterTeacherInput {
  name: string;
  email: string;
  password: string;
}

export interface AuthSession {
  user: User;
  token: string;
}

export interface AuthRepository {
  login(input: LoginInput): Promise<AuthSession>;
  register(input: RegisterInput): Promise<User>;
  registerTeacher(input: RegisterTeacherInput): Promise<User>;
  getCurrentUser(): Promise<User>;
}
