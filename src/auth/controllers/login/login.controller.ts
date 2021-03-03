import { AuthUserDto } from '@/auth/dtos/auth-user/auth-user.dto';
import { ReturnUserTokenDto } from '@/auth/dtos/return-user-token/return-user-token.dto';
import { ValidateUserService } from '@/auth/services/validate-user/validate-user.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class LoginController {
  constructor(private readonly validateUserService: ValidateUserService) {}

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'User logged with successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async login(@Body() authUserDto: AuthUserDto): Promise<ReturnUserTokenDto> {
    return await this.validateUserService.validateUser(authUserDto);
  }
}
