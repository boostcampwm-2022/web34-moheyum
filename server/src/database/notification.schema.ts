import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema({
  versionKey: false,
  timestamps: { createdAt: true, updatedAt: false },
})
export class Notification {
  _id: mongoose.Schema.Types.ObjectId;
  @Prop({
    required: true,
    index: true,
  })
  userid: string;

  @Prop({
    required: true,
  })
  url: string;

  @Prop({
    required: true,
  })
  message: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

NotificationSchema.index({ userid: 1, _id: -1 });
