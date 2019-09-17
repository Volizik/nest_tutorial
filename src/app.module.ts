import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TypeOrmConfig} from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
      TasksModule,
      AuthModule,
      TypeOrmModule.forRoot(TypeOrmConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
