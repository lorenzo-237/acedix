import { Request as RequestExpress } from 'express';
import { UserSession } from 'src/auth/session/user-session.entity';

export type Request = RequestExpress & { user: UserSession };
