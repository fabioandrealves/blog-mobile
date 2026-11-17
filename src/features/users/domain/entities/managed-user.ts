export type ManagedUserRole = 'teacher' | 'student';

export interface ManagedUser {
  id: number;
  name: string;
  email: string;
  role: ManagedUserRole;
  createdAt?: string;
  updatedAt?: string;
}