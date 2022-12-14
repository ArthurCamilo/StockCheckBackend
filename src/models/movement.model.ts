import mongoose, { Schema, Model, Document, Date, Types } from 'mongoose';
import { ProductDocument } from './product.model';
import { VendorDocument } from './vendor.model';

type MovementDocument = Document & {
  type: string;
  product: Types.ObjectId;
  vendor: Types.ObjectId;
  date: Date;
  quantity: number;
};

type MovementInput = {
  type: MovementDocument['type'];
  product: MovementDocument['product'];
  vendor: MovementDocument['vendor'];
  date: MovementDocument['date'];
  quantity: MovementDocument['quantity'];
};

const movementSchema = new Schema(
  {
    type: {
      type: Schema.Types.String,
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      default: null,
    },
    vendor: {
      type: Schema.Types.ObjectId,
      default: null,
    },
    date: {
      type: Schema.Types.Date,
      default: null,
    },
    quantity: {
      type: Schema.Types.Number,
      default: null,
    },
  },
  {
    collection: 'movements',
    timestamps: true,
  },
);

const Movement: Model<MovementDocument> = mongoose.model<MovementDocument>('Movement', movementSchema);

export { Movement, MovementInput, MovementDocument };