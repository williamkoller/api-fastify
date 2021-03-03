import { IsNotEmpty, IsString } from 'class-validator';

export class AuthUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
