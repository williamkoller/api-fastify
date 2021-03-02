import { LoadUsersRepository } from '@/user/repositories/load-users/load-users.repository';
import { User } from '@/user/schemas/user.schema';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class LoadUsersService {
  constructor(private readonly loadUsersRepo: LoadUsersRepository) {}
  async loadUsers(): Promise<User[]> {
    const users = await this.loadUsersRepo.loadUsers();

    if (users?.length === 0) {
      throw new NotFoundException('No record found.');
    }

    return users;
  }
}
