import { LoadUserByEmailRepository } from '@/user/repositories/load-user-by-email/load-user-by-email.repository';
import { User } from '@/user/schemas/user.schema';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';

@Injectable()
export class LoadUserByEmailService {
  private logger = new Logger(LoadUserByEmailService.name);
  constructor(
    private readonly loadUserByEmailRepo: LoadUserByEmailRepository,
  ) {}

  async loadUserByEmail(email: string): Promise<User> {
    const user = await this.loadUserByEmailRepo.loadByEmail(email);
    this.logger.log(user);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }
}
