import { LoadUserByIdRepository } from '@/user/repositories/load-user-by-id/load-user-by-id.repository';
import { User } from '@/user/schemas/user.schema';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class LoadUserByIdService {
  constructor(private readonly loadUserByIdRepo: LoadUserByIdRepository) {}

  async loadById(id: string): Promise<User> {
    const userFound = await this.loadUserByIdRepo.loadById(id);
    if (!userFound) {
      throw new NotFoundException('User not found.');
    }
    return userFound;
  }
}
