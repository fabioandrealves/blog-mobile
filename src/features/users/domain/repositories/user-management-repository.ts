import type { ManagedUser } from '../entities/managed-user';

export interface UpdateManagedUserInput {
  name?: string;
  email?: string;
}

export interface UserManagementRepository {
  listTeachers(): Promise<ManagedUser[]>;

  updateTeacher(
    id: number,
    input: UpdateManagedUserInput,
  ): Promise<ManagedUser>;

  deleteTeacher(id: number): Promise<void>;

  listStudents(): Promise<ManagedUser[]>;

  updateStudent(
    id: number,
    input: UpdateManagedUserInput,
  ): Promise<ManagedUser>;

  deleteStudent(id: number): Promise<void>;
}