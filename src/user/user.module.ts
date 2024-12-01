import { ClassProvider, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { User, UserSchema } from './schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';

const userService: ClassProvider = {
  provide: 'userService',
  useClass: UserService,
};

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [userService],
})
export class UserModule {}
