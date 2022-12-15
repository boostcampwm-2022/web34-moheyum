import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false, timestamps: true })
export class User {
  _id: mongoose.Schema.Types.ObjectId;

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
    default: '',
  })
  profileimg: string;

  @Prop({
    default: '',
  })
  bio: string;

  @Prop({
    default: 0,
  })
  postcount: number;

  @Prop({
    default: 0,
  })
  follower: number;

  @Prop({
    default: 0,
  })
  following: number;

  @Prop({
    default: true,
  })
  state: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

//for searchUser
UserSchema.index({
  state: 1,
  _id: 1,
  userid: 1,
});
UserSchema.index({
  state: 1,
  _id: 1,
  nickname: 1,
});
