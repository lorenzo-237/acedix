export class UserSession {
  id: number;
  username: string;
  email: string;
  role: 'USER' | 'MAINTAINER' | 'ADMIN';
}
