import { User, UserDocument } from '@/user/schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LoadUserByIdRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async loadById(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }
}
