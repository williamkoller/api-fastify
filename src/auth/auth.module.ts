import { HashComparer } from '@/shared/criptography';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtTokenService } from '@/auth/services/jwt/jwt-token.service';
import { LoginController } from '@/auth/controllers/login/login.controller';
import { LoadUserByEmailService } from '@/user/services/load-user-by-email/load-user-by-email.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/user/schemas/user.schema';
import { LoadUserByEmailRepository } from '@/user/repositories/load-user-by-email/load-user-by-email.repository';
import { ValidateUserService } from '@/auth/services/validate-user/validate-user.service';
import { JwtStrategy } from '@/auth/strategies/jwt/jwt-strategy';
import { LoadUserService } from '@/user/services/load-user/load-user.service';
import { MeController } from '@/auth/controllers/me/me.controller';
import { LoadUserByIdRepository } from '@/user/repositories/load-user-by-id/load-user-by-id.repository';
import { LoadUserByIdService } from '@/user/services/load-user-by-id/load-user-by-id.service';
import { LoadUserByNameService } from '@/user/services/load-user-by-name/load-user-by-name.service';
import { LoadUserByNameRepository } from '@/user/repositories/load-user-by-name/load-user-by-name.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: String(process.env.EXPIRES_IN),
        },
      }),
    }),
  ],
  exports: [JwtModule],
  providers: [
    HashComparer,
    JwtTokenService,
    LoadUserByEmailService,
    LoadUserService,
    LoadUserByEmailRepository,
    LoadUserByIdService,
    LoadUserByIdRepository,
    LoadUserByNameService,
    LoadUserByNameRepository,
    ValidateUserService,
    JwtStrategy,
  ],
  controllers: [LoginController, MeController],
})
export class AuthModule {}
