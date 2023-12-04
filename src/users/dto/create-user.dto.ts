export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  role: 'USER' | 'MAINTAINER' | 'ADMIN';
}
