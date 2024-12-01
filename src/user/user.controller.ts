import { UserInterface } from './user.interface';
import { Body, Controller, Get, Inject, Post, Render } from '@nestjs/common';
import { User } from './schema/user.schema';

@Controller('user')
export class UserController {
  constructor(
    @Inject('userService') private readonly userService: UserInterface,
  ) {}

  @Get()
  @Render('user/index')
  User() {
    return;
  }

  @Post('login')
  Login(@Body() user: User): object {
    return this.userService.Login(user);
  }

  @Post('logout')
  Logout(@Body('session') session: string): object {
    return this.userService.Logout(session);
  }

  @Post('check')
  Check(@Body('session') session: string): object {
    return this.userService.Check(session);
  }

  @Post('register')
  Register(@Body() user: User): object {
    return this.userService.Create(user);
  }
}
