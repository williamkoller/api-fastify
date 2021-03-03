import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(user: { sub: string; email: string }): Promise<string> {
    const payload = {
      sub: user.sub,
      email: user.email,
    };

    return this.jwtService.signAsync(payload);
  }
}
