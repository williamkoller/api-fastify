import { User, UserDocument } from '@/user/schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LoadUserByEmailRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async loadByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }, { __v: false });
  }
}
