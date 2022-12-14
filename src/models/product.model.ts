import mongoose, { Schema, Model, Document } from 'mongoose';

type ProductDocument = Document & {
  name: string;
  quantity: number;
  value: number;
  minQuantity: number;
  maxQuantity: number;
};

type ProductInput = {
  name: ProductDocument['name'];
  quantity: ProductDocument['quantity'];
  value: ProductDocument['value'];
  minQuantity: ProductDocument['minQuantity'];
  maxQuantity: ProductDocument['maxQuantity'];
};

const productSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    quantity: {
      type: Schema.Types.Number,
      required: true,
    },
    value: {
      type: Schema.Types.Number,
      required: true,
    },
    minQuantity: {
      type: Schema.Types.Number,
      required: true,
    },
    maxQuantity: {
      type: Schema.Types.Number,
      required: true,
    },
  },
  {
    collection: 'products',
    timestamps: true,
  },
);

const Product: Model<ProductDocument> = mongoose.model<ProductDocument>('Product', productSchema);

export { Product, ProductInput, ProductDocument };