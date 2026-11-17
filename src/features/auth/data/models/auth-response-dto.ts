import type { UserRole } from '../../domain/entities/user';

export interface UserDto {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
}

export interface RegisterResponseDto {
  message: string;
  data: {
    user: UserDto;
  };
}

export interface LoginResponseDto {
  message: string;
  data: {
    user: UserDto;
    token: string;
  };
}