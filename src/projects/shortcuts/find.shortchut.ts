import { PrismaService } from 'nestjs-prisma';

export function findOneProject(
  prisma: PrismaService,
  user_id: number,
  project_id: number,
) {
  return prisma.userProject.findUnique({
    where: {
      user_id_project_id: {
        user_id,
        project_id,
      },
    },
    include: {
      project: {
        include: {
          UserProject: {
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                  email: true,
                },
              },
            },
          },
        },
      },
    },
  });
}

export function findAllUserProjects(prisma: PrismaService, user_id: number) {
  return prisma.userProject.findMany({
    where: {
      user_id,
      belongs: true,
    },
    include: {
      project: {
        include: {
          UserProject: {
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                  email: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: {
      project: {
        name: 'asc',
      },
    },
  });
}
