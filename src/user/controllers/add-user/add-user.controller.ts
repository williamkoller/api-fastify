import { AddUserDto } from '@/user/dtos/add-user/add-user.dto';
import { User } from '@/user/schemas/user.schema';
import { AddUserService } from '@/user/services/add-user/add-user.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class AddUserController {
  constructor(private readonly addUserService: AddUserService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Add a user',
  })
  @ApiResponse({
    status: 400,
    description: 'Error in create user.',
  })
  async add(@Body() addUserDto: AddUserDto): Promise<User> {
    return await this.addUserService.addUser(addUserDto);
  }
}
