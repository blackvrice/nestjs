import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UserModule} from './user/user.module';
import {MongooseModule} from '@nestjs/mongoose';
import {ConfigModule} from '@nestjs/config';
import * as process from 'node:process';
import * as mongoose from 'mongoose';

@Module({
  imports: [UserModule, ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MongoDB)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.NODE_ENV === 'dev' ? true : false;

  configure(consumer: MiddlewareConsumer): any {
    mongoose.set('debug', this.isDev);
  }

}
