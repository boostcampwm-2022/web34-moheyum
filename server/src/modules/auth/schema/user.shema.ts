import { HydratedDocument, Types, SchemaOptions } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<User>;

const options: SchemaOptions = {
  timestamps: true,
  versionKey: false,
};

/**
 * @description User Schema(Mongo) 구성
 */
@Schema(options)
export class User {
  @Prop({
    required: true,
    unique: true,
  })
  nickname: string;
  @Prop()
  userId: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  // id  String  @id @default(auto()) @map("_id") @db.ObjectId
  // nickName String @unique
  // userId String?
  // email String?
  // password String?
}

export const UserSchema = SchemaFactory.createForClass(User);
