import { Request, Response } from 'express';
import { Vendor, VendorInput } from '../models/vendor.model';


const getVendors = async (req: Request, res: Response) => {
    const vendors = await Vendor.find().exec();
    return res.status(200).json({ data: vendors });
};

const addVendor = async (req: Request, res: Response) => {
    const vendorInput = req.body as VendorInput;
    const vendorCreated = Vendor.create(vendorInput);
    return res.status(201).json({ data: vendorCreated });
};

const editVendor = async (req: Request, res: Response) => {
    const { id } = req.params;
    const editedVendor = req.body as VendorInput;
  
    const vendor = await Vendor.findOne({ _id: id });
  
    if (!vendor) {
      return res.status(404).json({ message: `Vendor with id "${id}" not found.` });
    }
  
    await Vendor.updateOne({ _id: id }, editedVendor);
  
    const updatedVendor = await Vendor.findById(id);
  
    return res.status(200).json({ data: updatedVendor });
};

const deleteVendor = async (req: Request, res: Response) => {
    const { id } = req.params;

    await Vendor.findByIdAndDelete(id);
  
    return res.status(200).json({ message: 'Vendor deleted successfully.' });
};

export {
    getVendors,
    addVendor,
    editVendor,
    deleteVendor,
}