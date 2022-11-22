import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false, timestamps: true })
export class User {
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

  @Prop()
  profileimg: string;

  @Prop()
  bio: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
