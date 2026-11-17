import type { ManagedUser } from '../../domain/entities/managed-user';

import type { UserManagementRepository } from '../../domain/repositories/user-management-repository';

export class ListTeachers {
  constructor(
    private readonly repository: UserManagementRepository,
  ) {}

  async execute(): Promise<ManagedUser[]> {
    return this.repository.listTeachers();
  }
}
