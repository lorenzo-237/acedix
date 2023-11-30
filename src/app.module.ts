import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BoardsModule } from './boards/boards.module';
import { ListsModule } from './lists/lists.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BoardsModule,
    ListsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
