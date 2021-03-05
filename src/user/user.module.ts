import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/user/schemas/user.schema';
import { AddUserRepository } from '@/user/repositories/add-user/add-user.repository';
import { LoadUsersRepository } from '@/user/repositories/load-users/load-users.repository';
import { LoadUserByEmailRepository } from '@/user/repositories/load-user-by-email/load-user-by-email.repository';
import { AddUserController } from '@/user/controllers/add-user/add-user.controller';
import { AddUserService } from '@/user/services/add-user/add-user.service';
import { HashComparer, Hasher } from '@/shared/criptography';
import { LoadUsersService } from '@/user/services/load-users/load-users.service';
import { LoadUsersController } from '@/user/controllers/load-users/load-users.controller';
import { LoadUserByIdRepository } from '@/user/repositories/load-user-by-id/load-user-by-id.repository';
import { LoadUserByIdService } from '@/user/services/load-user-by-id/load-user-by-id.service';
import { LoadUserByIdController } from '@/user/controllers/load-user-by-id/load-user-by-id.controller';
import { LoadUserByEmailService } from '@/user/services/load-user-by-email/load-user-by-email.service';
import { LoadUserByNameRepository } from '@/user/repositories/load-user-by-name/load-user-by-name.repository';
import { LoadUserByNameService } from '@/user/services/load-user-by-name/load-user-by-name.service';
import { DeleteUserRepository } from '@/user/repositories/delete-user/delete-user.repository';

@Module({
  imports: [
    forwardRef(() =>
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ),
    forwardRef(() =>
      CacheModule.register({
        ttl: Number(process.env.CACHE_TTL),
        max: Number(process.env.CACHE_MAX),
      }),
    ),
  ],
  providers: [
    AddUserRepository,
    LoadUsersRepository,
    LoadUserByEmailRepository,
    LoadUserByIdRepository,
    LoadUserByNameRepository,
    AddUserService,
    LoadUsersService,
    LoadUserByIdService,
    LoadUserByEmailService,
    LoadUserByNameService,
    DeleteUserRepository,
    Hasher,
    HashComparer,
  ],
  controllers: [AddUserController, LoadUsersController, LoadUserByIdController],
})
export class UserModule {}
