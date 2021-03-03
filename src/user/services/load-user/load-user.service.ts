import { User } from '@/user/schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { LoadUserByEmailService } from '../load-user-by-email/load-user-by-email.service';

@Injectable()
export class LoadUserService {
  constructor(
    private readonly loadUserByEmailService: LoadUserByEmailService,
  ) {}

  async loadUser(email: string): Promise<User> {
    return await this.loadUserByEmailService.loadUserByEmail(email);
  }
}
