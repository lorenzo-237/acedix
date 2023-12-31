import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BoardsModule } from './boards/boards.module';
import { ListsModule } from './lists/lists.module';
import { PrismaModule } from 'nestjs-prisma';
import { ProjectsModule } from './projects/projects.module';
import { VersionsModule } from './versions/versions.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CardsModule } from './cards/cards.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule.forRoot({ isGlobal: true }),
    AuthModule,
    BoardsModule,
    ListsModule,
    ProjectsModule,
    VersionsModule,
    UsersModule,
    CardsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
