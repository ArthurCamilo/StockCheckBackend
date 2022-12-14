import { Request, Response } from 'express';
import { Product, ProductInput } from '../models/product.model';


const getProducts = async (req: Request, res: Response) => {
    const products = await Product.find().exec();
    return res.status(200).json({ data: products });
};

const addProduct = async (req: Request, res: Response) => {
    const productInput = req.body as ProductInput;
    const productCreated = Product.create(productInput);
    return res.status(201).json({ data: productCreated });
};

const editProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const editedProduct = req.body as ProductInput;
  
    const product = await Product.findOne({ _id: id });
  
    if (!product) {
      return res.status(404).json({ message: `Product with id "${id}" not found.` });
    }
  
    await Product.updateOne({ _id: id }, editedProduct);
  
    const updatedProduct = await Product.findById(id);
  
    return res.status(200).json({ data: updatedProduct });
};

const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    await Product.findByIdAndDelete(id);
  
    return res.status(200).json({ message: 'Product deleted successfully.' });
};

export {
    getProducts,
    addProduct,
    editProduct,
    deleteProduct,
}