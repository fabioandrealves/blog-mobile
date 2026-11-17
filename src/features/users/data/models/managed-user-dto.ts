import type {
  ManagedUser,
  ManagedUserRole,
} from '../../domain/entities/managed-user';

export interface ManagedUserDto {
  id: number;
  name: string;
  email: string;
  role: ManagedUserRole;
  createdAt?: string;
  updatedAt?: string;
}

export interface ManagedUsersResponseDto {
  message: string;
  data: {
    users: ManagedUserDto[];
  };
}

export interface ManagedUserResponseDto {
  message: string;
  data: {
    user: ManagedUserDto;
  };
}

export function toManagedUser(
  dto: ManagedUserDto,
): ManagedUser {
  return {
    id: dto.id,
    name: dto.name,
    email: dto.email,
    role: dto.role,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
}
