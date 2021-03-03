import { User } from '@/user/schemas/user.schema';
import { LoadUsersService } from '@/user/services/load-users/load-users.service';
import {
  CacheInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('users')
@UseInterceptors(CacheInterceptor)
export class LoadUsersController {
  constructor(private readonly loadUsersService: LoadUsersService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Load All Users.',
  })
  @ApiResponse({
    status: 404,
    description: 'No record found.',
  })
  async loadUsers(): Promise<User[]> {
    return await this.loadUsersService.loadUsers();
  }
}
