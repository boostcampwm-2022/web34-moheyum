import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false, timestamps: true })
export class User {
  _id: string;
  @Prop({
    unique: true,
    required: true,
  })
  userid: string;

  @Prop({
    unique: true,
    required: true,
  })
  nickname: string;

  @Prop({
    unique: true,
    required: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: true,
  })
  profileimg: string;

  @Prop({
    required: true,
  })
  bio: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
