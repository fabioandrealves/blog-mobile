import type { UserManagementRepository } from '../../domain/repositories/user-management-repository';

export class DeleteStudent {
  constructor(
    private readonly repository: UserManagementRepository,
  ) {}

  async execute(id: number): Promise<void> {
    await this.repository.deleteStudent(id);
  }
}