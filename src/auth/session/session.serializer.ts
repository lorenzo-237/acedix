import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { UserSession } from './user-session.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UsersService) {
    super();
  }

  serializeUser(user: UserSession, done: (err, user: UserSession) => void) {
    done(null, user);
  }

  async deserializeUser(
    userSession: UserSession,
    done: (err, user: UserSession) => void,
  ) {
    console.log('here');
    const userDB = await this.userService.findOneById(userSession.id);
    if (!userDB) {
      return done(null, null);
    }

    return done(null, userSession);
  }
}
