import { UserBelongingToProject } from '../entities/project.entity';

export function sortUsersByUsername(
  users: UserBelongingToProject[],
): UserBelongingToProject[] {
  return users.slice().sort((a, b) => a.username.localeCompare(b.username));
}

type PrimsaUserProject = ({
  user: {
    id: number;
    email: string;
    username: string;
  };
} & {
  user_id: number;
  belongs: boolean;
  project_id: number;
  owner: boolean;
  lastDate: Date;
  favorite: boolean;
})[];

export function getUserAuthenticated(
  UserProject: PrimsaUserProject,
  user_id: number,
): UserBelongingToProject {
  const find = UserProject.find(({ user }) => user.id === user_id);
  const auth: UserBelongingToProject = find
    ? {
        email: find.user.email,
        id: find.user.id,
        username: find.user.username,
        owner: find.owner,
      }
    : {
        email: 'nothing',
        id: -1,
        username: 'nothing',
        owner: false,
      };

  return auth;
}

export function getUsersBelongingToProject(
  UserProject: PrimsaUserProject,
  sort: boolean,
): UserBelongingToProject[] {
  const usersProject: UserBelongingToProject[] = UserProject.map((up) => ({
    id: up.user_id,
    username: up.user.username,
    email: up.user.email,
    owner: up.owner,
  }));
  return sort ? sortUsersByUsername(usersProject) : usersProject;
}
