import { Version } from 'src/versions/entities/version.entity';
import { PrismaProject } from '../models';

// TODO : add user.firstname / lastname
// TODO : add into user_project a column 'role'
// TODO : check the service to add these data to the payload
export class Project implements PrismaProject {
  id: number;
  name: string;
  description: string;
  createdById: number;
  createdAt: Date;
  updatedById: number;
  updatedAt: Date;
  versions?: Version[];
  userAuthenticated?: UserBelongingToProject;
  lastDate?: Date;
  isFavorite?: boolean;
  users?: UserBelongingToProject[];
}

export class UserBelongingToProject {
  id: number;
  username: string;
  email: string;
  owner: boolean;
}
