import { LoadUserByNameRepository } from '@/user/repositories/load-user-by-name/load-user-by-name.repository';
import { User } from '@/user/schemas/user.schema';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class LoadUserByNameService {
  constructor(private readonly loadUSerByNameRepo: LoadUserByNameRepository) {}

  async loadByName(name: string): Promise<User> {
    const user = await this.loadUSerByNameRepo.loadByName(name);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }
}
