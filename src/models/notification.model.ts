import mongoose, { Schema, Model, Document, Types } from 'mongoose';
import { ProductDocument } from './product.model';

type NotificationDocument = Document & {
  product: Types.ObjectId;
  msg: string;
  type: string;
};

type NotificationInput = {
  product: NotificationDocument['product'];
  msg: NotificationDocument['msg'];
  type: NotificationDocument['type'];
};

const notificationSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      default: null,
    },
    msg: {
      type: Schema.Types.String,
      default: null,
    },
    type: {
      type: Schema.Types.String,
      default: null,
    },
  },
  {
    collection: 'notifications',
    timestamps: true,
  },
);

const Notification: Model<NotificationDocument> = mongoose.model<NotificationDocument>('Notification', notificationSchema);

export { Notification, NotificationInput, NotificationDocument };