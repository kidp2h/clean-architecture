import { Length } from 'class-validator';

export class AuthorizeDto {
  @Length(4, 20)
  username: string;

  @Length(6)
  password: string;
}
