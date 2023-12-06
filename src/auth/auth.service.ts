import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { UserSession } from './session/user-session.entity';

const UserToUserSession = (user: User): UserSession => {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
  };
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username);

    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return UserToUserSession(user);
    }

    return null;
  }

  async loginJwt(user: User): Promise<{ accessToken: string }> {
    const payload = { sub: user.id, session: UserToUserSession(user) };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
