import { Request, Response } from 'express';
import { Movement, MovementInput } from '../models/movement.model';
import { Notification } from '../models/notification.model';
import { Product, ProductDocument, ProductInput } from '../models/product.model';


const getMovements = async (req: Request, res: Response) => {
    const movements = await Movement.find().exec();
    return res.status(200).json({ data: movements });
};

const getUpdatedProductQuantity = async (movement: MovementInput, product: ProductDocument) => {
    if (movement.type == "Entrada") {
        return parseFloat(product.quantity.toString()) + parseFloat(movement.quantity.toString());
    } else if (movement.type == "Saída") {
        return parseFloat(product.quantity.toString()) - parseFloat(movement.quantity.toString());
    }

    return 0;
}

const editProduct = async (movement: MovementInput, notify: boolean) => {
    const product = await Product.findById(movement.product).exec();

    if (!product) return;

    const updatedProductQuantity = await getUpdatedProductQuantity(movement, product);

    const productToUpdate = { 
        name: product.name,
        value: product.value,
        minQuantity: product.minQuantity,
        maxQuantity: product.maxQuantity,
        quantity: updatedProductQuantity
    };

    await Product.updateOne({ _id: movement.product }, productToUpdate);
    const updatedProduct = await Product.findById(movement.product).exec();

    if (updatedProduct && notify) {
        handleNotificationCheck(updatedProductQuantity, updatedProduct);
    }
}

const handleNotificationCheck = async (updatedProductQuantity: number, updatedProduct: ProductDocument) => {
    if (updatedProductQuantity < updatedProduct.minQuantity) {
        const notification = { 
            product: updatedProduct, 
            msg: `O produto ${updatedProduct.name} está abaixo do estoque mínimo`,
            type: 'Min' 
        };
        await Notification.create(notification);
    }

    if (updatedProductQuantity > updatedProduct.maxQuantity) {
        const notification = { 
            product: updatedProduct, 
            msg: `O produto ${updatedProduct.name} está acima do estoque máximo`,
            type: 'Max' 
        };
        await Notification.create(notification);
    }
}

const addMovement = async (req: Request, res: Response) => {
    const movementInput = req.body as MovementInput;
    const movementCreated = Movement.create(movementInput);
    editProduct(movementInput, true);
    return res.status(201).json({ data: movementCreated });
};

const editMovement = async (req: Request, res: Response) => {
    const { id } = req.params;
    const editedMovement = req.body as MovementInput;
  
    const movement = await Movement.findOne({ _id: id });
  
    if (!movement) {
      return res.status(404).json({ message: `Movement with id "${id}" not found.` });
    }
  
    await Movement.updateOne({ _id: id }, editedMovement);
  
    const updatedMovement = await Movement.findById(id);
    editProduct({
        type: movement.type,
        product: movement.product,
        vendor: movement.vendor,
        date: movement.date,
        quantity: movement.quantity * -1,
    }, false);
    editProduct(editedMovement, true);

    return res.status(200).json({ data: updatedMovement });
};

const deleteMovement = async (req: Request, res: Response) => {
    const { id } = req.params;

    const movement = await Movement.findByIdAndDelete(id);

    if (movement) {
        editProduct({
            type: movement.type,
            product: movement.product,
            vendor: movement.vendor,
            date: movement.date,
            quantity: movement.quantity * -1,
        }, true);
    }
    

    return res.status(200).json({ message: 'Movement deleted successfully.' });
};

export {
    getMovements,
    addMovement,
    deleteMovement,
    editMovement,
}