import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { UserSession } from './user-session.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UsersService) {
    super();
  }

  serializeUser(user: User, done: (err, user: UserSession) => void) {
    const userSession: UserSession = {
      id: user.id,
      email: user.email,
      role: user.role,
      username: user.role,
    };

    done(null, userSession);
  }

  async deserializeUser(
    userSession: UserSession,
    done: (err, user: UserSession) => void,
  ) {
    const userDB = await this.userService.findOneByUsername(
      userSession.username,
    );
    if (!userDB) {
      return done(null, null);
    }

    return done(null, userSession);
  }
}
