import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';

@Injectable()
export class HashComparer {
  async compare(password: string, hash: string): Promise<boolean> {
    return compareSync(password, hash);
  }
}
