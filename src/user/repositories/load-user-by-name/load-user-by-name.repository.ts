import { User, UserDocument } from '@/user/schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LoadUserByNameRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async loadByName(name: string): Promise<User> {
    return await this.userModel.findOne({ name });
  }
}
