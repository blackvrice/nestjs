import { UserInterface } from './user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import * as crypto from 'node:crypto';

@Injectable()
export class UserService implements UserInterface {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async Login(user: User): Promise<object> {
    user.password = crypto
      .createHash('sha256')
      .update(user.password)
      .digest('hex');
    const date: Date = new Date();
    const session: string = crypto
      .createHash('sha256')
      .update(date.getTime().toString())
      .digest('hex');
    let result = {
      result: false,
      session: '',
    };
    let searchUser = await this.userModel.findOne(user);
    if (searchUser !== null) {
      await this.userModel.updateOne(user, {
        $set: { session: session },
      });
      result.session = session;
      result.result = true;
    }
    return result;
  }
  async Logout(session: string): Promise<object> {
    await this.userModel.updateOne(
      { session: session },
      { $unset: { session: '' } },
    );
    return {
      result: 'success',
    };
  }

  async Check(session: string): Promise<object> {
    let findUser = await this.userModel.findOne({ session: session });
    console.log(findUser);
    if (!findUser) {
      return {
        result: false,
      };
    }
    return {
      result: true,
    };
  }

  async Create(user: User): Promise<object> {
    user.password = crypto
      .createHash('sha256')
      .update(user.password)
      .digest('hex');
    await this.userModel.create(user);
    return {
      result: true,
    };
  }
}
