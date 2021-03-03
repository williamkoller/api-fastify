import { User } from '@/user/schemas/user.schema';
import { LoadUserByEmailService } from '@/user/services/load-user-by-email/load-user-by-email.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly loadUserByEmailService: LoadUserByEmailService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { email: string }): Promise<User> {
    const user = await this.loadUserByEmailService.loadUserByEmail(
      payload.email,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
