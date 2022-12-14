import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FollowDocument = HydratedDocument<Follow>;

@Schema({ versionKey: false, timestamps: true })
export class Follow {
  @Prop({
    required: true,
  })
  userid: string;

  @Prop({
    required: true,
  })
  targetid: string;
}

export const FollowSchema = SchemaFactory.createForClass(Follow);

FollowSchema.index({ userid: 1 });
FollowSchema.index({ targetid: 1 });

// FollowSchema.indexes([

// ])
