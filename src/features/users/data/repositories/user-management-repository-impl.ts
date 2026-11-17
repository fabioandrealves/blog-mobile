import type { HttpClient } from '@/src/core/http/http-client';

import type { ManagedUser } from '../../domain/entities/managed-user';

import type {
  UpdateManagedUserInput,
  UserManagementRepository,
} from '../../domain/repositories/user-management-repository';

import {
  toManagedUser,
  type ManagedUsersResponseDto,
  type ManagedUserResponseDto,
} from '../models/managed-user-dto';

export class UserManagementRepositoryImpl
  implements UserManagementRepository
{
  private readonly teachersEndpoint = '/teachers';
  private readonly studentsEndpoint = '/students';

  constructor(
    private readonly httpClient: HttpClient,
  ) {}

  async listTeachers(): Promise<ManagedUser[]> {
    const response =
      await this.httpClient.request<ManagedUsersResponseDto>(
        this.teachersEndpoint,
        {
          method: 'GET',
          requiresAuth: true,
        },
      );

    return response.data.users.map(toManagedUser);
  }

  async updateTeacher(
    id: number,
    input: UpdateManagedUserInput,
  ): Promise<ManagedUser> {
    const response =
      await this.httpClient.request<ManagedUserResponseDto>(
        `${this.teachersEndpoint}/${id}`,
        {
          method: 'PUT',
          body: input,
          requiresAuth: true,
        },
      );

    return toManagedUser(response.data.user);
  }

  async deleteTeacher(id: number): Promise<void> {
    await this.httpClient.request<void>(
      `${this.teachersEndpoint}/${id}`,
      {
        method: 'DELETE',
        requiresAuth: true,
      },
    );
  }

  async listStudents(): Promise<ManagedUser[]> {
    const response =
      await this.httpClient.request<ManagedUsersResponseDto>(
        this.studentsEndpoint,
        {
          method: 'GET',
          requiresAuth: true,
        },
      );

    return response.data.users.map(toManagedUser);
  }

  async updateStudent(
    id: number,
    input: UpdateManagedUserInput,
  ): Promise<ManagedUser> {
    const response =
      await this.httpClient.request<ManagedUserResponseDto>(
        `${this.studentsEndpoint}/${id}`,
        {
          method: 'PUT',
          body: input,
          requiresAuth: true,
        },
      );

    return toManagedUser(response.data.user);
  }

  async deleteStudent(id: number): Promise<void> {
    await this.httpClient.request<void>(
      `${this.studentsEndpoint}/${id}`,
      {
        method: 'DELETE',
        requiresAuth: true,
      },
    );
  }
}
