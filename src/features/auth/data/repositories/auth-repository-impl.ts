import type { HttpClient } from '@/src/core/http/http-client';

import type { User } from '../../domain/entities/user';
import type {
  AuthRepository,
  AuthSession,
  LoginInput,
  RegisterInput,
} from '../../domain/repositories/auth-repository';

import type {
  LoginResponseDto,
  RegisterResponseDto,
  UserDto,
} from '../models/auth-response.dto';

function toUser(dto: UserDto): User {
  return {
    id: dto.id,
    name: dto.name,
    email: dto.email,
    role: dto.role,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
}

export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    private readonly httpClient: HttpClient,
  ) {}

async register(input: RegisterInput): Promise<User> {
  const response =
    await this.httpClient.request<RegisterResponseDto>(
      '/auth/register',
      {
        method: 'POST',
        requiresAuth: false,
        body: {
          ...input,
          name: input.name.trim(),
          email: input.email.trim().toLowerCase(),
        },
      },
    );

  return toUser(response.data.user);
}

async registerTeacher(
  input: RegisterTeacherInput,
): Promise<User> {
  const response = await this.httpClient.request<RegisterResponseDto>(
    '/auth/teachers',
    {
      method: 'POST',
      body: input,
      requiresAuth: true,
    },
  );

  return toUser(response.data.user);
}

async login(input: LoginInput): Promise<AuthSession> {
  const response =
    await this.httpClient.request<LoginResponseDto>(
      '/auth/login',
      {
        method: 'POST',
        requiresAuth: false,
        body: {
          email: input.email.trim().toLowerCase(),
          password: input.password,
        },
      },
    );

  return {
    user: toUser(response.data.user),
    token: response.data.token,
  };
}

async getCurrentUser(): Promise<User> {
  const response =
    await this.httpClient.request<{ data: { user: UserDto } }>(
      '/auth/me',
      {
        method: 'GET',
        requiresAuth: true,
      },
    );

  return toUser(response.data.user);
}
}