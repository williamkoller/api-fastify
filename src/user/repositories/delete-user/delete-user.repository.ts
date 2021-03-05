import { User, UserDocument } from '@/user/schemas/user.schema';
import { MessageResponseType } from '@/user/types/message-response/message-response.type';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DeleteUserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async deleteUser(id: string): Promise<MessageResponseType> {
    await this.userModel.deleteOne({ _id: id });
    return {
      message: 'User deleted with successfully.',
    };
  }
}
