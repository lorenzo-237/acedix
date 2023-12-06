export class UserSession {
  id: number;
  email: string;
  role: 'USER' | 'MAINTAINER' | 'ADMIN';
}
