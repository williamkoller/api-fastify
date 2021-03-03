import { User } from '@/user/schemas/user.schema';
import { LoadUserByIdService } from '@/user/services/load-user-by-id/load-user-by-id.service';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class LoadUserByIdController {
  constructor(private readonly loadUserByIdService: LoadUserByIdService) {}

  @Get(':id')
  async loadUserById(@Param('id') id: string): Promise<User> {
    return await this.loadUserByIdService.loadById(id);
  }
}
