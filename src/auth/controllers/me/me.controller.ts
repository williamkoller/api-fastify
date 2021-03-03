import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuth } from '@/auth/guard/jwt-auth/jwt-auth.guard';
import { LoadUserService } from '@/user/services/load-user/load-user.service';
import { UserProfileType } from '@/user/types/user-profile/user-profile.type';

@ApiTags('me')
@Controller('me')
export class MeController {
  constructor(private readonly loadUserService: LoadUserService) {}

  @Get()
  @UseGuards(JwtAuth)
  @ApiResponse({
    status: 200,
    description: 'Return UserProfile in request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async me(@Request() request: any): Promise<UserProfileType> {
    return await this.loadUserService.loadUser(request.email);
  }
}
