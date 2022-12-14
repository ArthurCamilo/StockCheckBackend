import mongoose, { Schema, Model, Document } from 'mongoose';

type VendorDocument = Document & {
  name: string;
  email: string;
  phone: string;
  type: string;
};

type VendorInput = {
  name: VendorDocument['name'];
  email: VendorDocument['email'];
  phone: VendorDocument['phone'];
  type: VendorDocument['type'];
};

const vendorSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    email: {
      type: Schema.Types.String,
      default: null,
    },
    phone: {
      type: Schema.Types.String,
      default: null,
    },
    type: {
      type: Schema.Types.String,
      default: null,
    },
  },
  {
    collection: 'vendors',
    timestamps: true,
  },
);

const Vendor: Model<VendorDocument> = mongoose.model<VendorDocument>('Vendor', vendorSchema);

export { Vendor, VendorInput, VendorDocument };