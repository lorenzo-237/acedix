import { Project, UserBelongingToProject } from '../entities/project.entity';
import { PrismaProject, PrismaUserProject } from '../models';

export function sortUsersByUsername(
  users: UserBelongingToProject[],
): UserBelongingToProject[] {
  return users.slice().sort((a, b) => a.username.localeCompare(b.username));
}

export function getUserAuthenticated(
  UserProject: PrismaUserProject[],
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
  UserProject: PrismaUserProject[],
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

type ItemPrisma = PrismaUserProject & {
  project: PrismaProject & {
    UserProject: PrismaUserProject[];
  };
};

export async function formatPrismaProject(
  item: ItemPrisma,
  user_id: number,
): Promise<Project> {
  const UserProject = item.project.UserProject;

  delete item.project.UserProject;

  const formattedProject: Project = {
    ...item.project,
    userAuthenticated: getUserAuthenticated(UserProject, user_id),
    lastDate: item.lastDate,
    isFavorite: item.favorite,
    users: getUsersBelongingToProject(UserProject, true),
  };

  return formattedProject;
}
