export type PrismaProject = {
  id: number;
  name: string;
  description: string;
  createdById: number;
  createdAt: Date;
  updatedById: number;
  updatedAt: Date;
};

export type PrismaUserProject = {
  user_id: number;
  belongs: boolean;
  project_id: number;
  owner: boolean;
  lastDate: Date;
  favorite: boolean;
  user?: {
    id: number;
    email: string;
    username: string;
  };
};
