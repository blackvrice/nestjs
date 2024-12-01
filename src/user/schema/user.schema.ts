import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  userId: string;

  @Prop()
  password: string;

  @Prop()
  userName: string;

  @Prop()
  session: string;
}

export const UserSchema = SchemaFactory.createForClass(User);