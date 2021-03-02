import { Hasher } from '@/shared/criptography';
import { AddUserDto } from '@/user/dtos/add-user/add-user.dto';
import { User, UserDocument } from '@/user/schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AddUserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly hasher: Hasher,
  ) {}

  async add(addUserDto: AddUserDto): Promise<User> {
    const { password } = addUserDto;
    const dataUser = {
      ...addUserDto,
      password: await this.hasher.hash(password),
    };
    const createdUser = new this.userModel(dataUser);
    return createdUser.save();
  }
}
