import { AddUserDto } from '@/user/dtos/add-user/add-user.dto';
import { AddUserRepository } from '@/user/repositories/add-user/add-user.repository';
import { LoadUserByEmailRepository } from '@/user/repositories/load-user-by-email/load-user-by-email.repository';
import { User } from '@/user/schemas/user.schema';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
} from '@nestjs/common';

@Injectable()
export class AddUserService {
  private readonly logger = new Logger(AddUserService.name);
  constructor(
    private readonly addUserRepo: AddUserRepository,
    private readonly loadUserByEmailRepo: LoadUserByEmailRepository,
  ) {}

  async addUser(addUserDto: AddUserDto): Promise<User> {
    try {
      const { email } = addUserDto;
      const user = await this.loadUserByEmailRepo.loadByEmail(email);

      if (user) {
        throw new ConflictException(
          `A user already exists with this ${email}.`,
        );
      }

      return await this.addUserRepo.add(addUserDto);
    } catch (e) {
      this.logger.log(e);
      throw new BadRequestException(e);
    }
  }
}
