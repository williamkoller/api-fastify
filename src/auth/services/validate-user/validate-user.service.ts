import { AuthUserDto } from '@/auth/dtos/auth-user/auth-user.dto';
import { ReturnUserTokenDto } from '@/auth/dtos/return-user-token/return-user-token.dto';
import { HashComparer } from '@/shared/criptography';
import { LoadUserByEmailService } from '@/user/services/load-user-by-email/load-user-by-email.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtTokenService } from '../jwt/jwt-token.service';

@Injectable()
export class ValidateUserService {
  constructor(
    private readonly loadUserByEmailService: LoadUserByEmailService,
    private readonly hashComparer: HashComparer,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  async validateUser(authUserDto: AuthUserDto): Promise<ReturnUserTokenDto> {
    const user = await this.loadUserByEmailService.loadUserByEmail(
      authUserDto.email,
    );
    if (!user) {
      throw new UnauthorizedException();
    }

    const validPassword = await this.hashComparer.compare(
      authUserDto.password,
      user.password,
    );

    if (!validPassword) {
      throw new UnauthorizedException('Incorrect email or password.');
    }

    return {
      user,
      token: await this.jwtTokenService.generateToken({
        email: user.email,
        sub: user.name,
      }),
    };
  }
}
