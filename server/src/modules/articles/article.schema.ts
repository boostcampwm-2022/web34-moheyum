import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ArticleDocument = HydratedDocument<Article>;

@Schema({ versionKey: false })
export class Article {
  @Prop()
  title: string;

  @Prop()
  description: string;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  @Prop()
  author: string;

  // TODO : Date 추가
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
