import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BoardsModule } from './boards/boards.module';
import { ListsModule } from './lists/lists.module';
import { PrismaModule } from 'nestjs-prisma';
import { ProjectsModule } from './projects/projects.module';
import { VersionsModule } from './versions/versions.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule.forRoot({ isGlobal: true }),
    BoardsModule,
    ListsModule,
    ProjectsModule,
    VersionsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
