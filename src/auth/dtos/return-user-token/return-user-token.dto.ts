import { User } from '@/user/schemas/user.schema';

export class ReturnUserTokenDto {
  user: User;
  token: string;
}
