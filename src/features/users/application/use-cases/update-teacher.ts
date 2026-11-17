import type { ManagedUser } from '../../domain/entities/managed-user';

import type {
  UpdateManagedUserInput,
  UserManagementRepository,
} from '../../domain/repositories/user-management-repository';

export class UpdateTeacher {
  constructor(
    private readonly repository: UserManagementRepository,
  ) {}

  async execute(
    id: number,
    input: UpdateManagedUserInput,
  ): Promise<ManagedUser> {
    return this.repository.updateTeacher(id, input);
  }
}
