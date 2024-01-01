import { UserBelongingToProject } from '../entities/project.entity';

export function sortUsersByUsername(
  users: UserBelongingToProject[],
): UserBelongingToProject[] {
  return users.slice().sort((a, b) => a.username.localeCompare(b.username));
}
