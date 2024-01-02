import { Version } from 'src/versions/entities/version.entity';

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
