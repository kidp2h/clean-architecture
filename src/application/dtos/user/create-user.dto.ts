import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(4, 20)
  username: string;

  @IsString()
  @Length(6)
  password: string;
}
