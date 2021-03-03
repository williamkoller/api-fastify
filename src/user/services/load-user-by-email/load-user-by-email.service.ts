import { LoadUserByEmailRepository } from '@/user/repositories/load-user-by-email/load-user-by-email.repository';
import { User } from '@/user/schemas/user.schema';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class LoadUserByEmailService {
  constructor(
    private readonly loadUserByEmailRepo: LoadUserByEmailRepository,
  ) {}

  async loadUserByEmail(email: string): Promise<User> {
    const user = await this.loadUserByEmailRepo.loadByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }
}
