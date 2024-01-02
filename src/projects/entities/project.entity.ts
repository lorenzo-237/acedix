import { Version } from 'src/versions/entities/version.entity';

// TODO : add user.firstname / lastname
// TODO : add into user_project a column 'role'
// TODO : check the service to add these data to the payload
export class Project {
  id: number;
  name: string;
  description: string;
  versions?: Version[];
  createdById: number;
  createdAt: Date;
  updatedById: number;
  updatedAt: Date;
  lastDate?: Date;
  isFavorite?: boolean;
  users?: UserBelongingToProject[];
}

export class UserBelongingToProject {
  id: number;
  username: string;
  email: string;
}
