import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/user/schemas/user.schema';
import { AddUserRepository } from '@/user/repositories/add-user/add-user.repository';
import { LoadUsersRepository } from '@/user/repositories/load-users/load-users.repository';
import { LoadUserByEmailRepository } from '@/user/repositories/load-user-by-email/load-user-by-email.reposiotry';
import { AddUserController } from '@/user/controllers/add-user/add-user.controller';
import { AddUserService } from '@/user/services/add-user/add-user.service';
import { HashComparer, Hasher } from '@/shared/criptography';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    AddUserRepository,
    LoadUsersRepository,
    LoadUserByEmailRepository,
    AddUserService,
    Hasher,
    HashComparer,
  ],
  controllers: [AddUserController],
})
export class UserModule {}
