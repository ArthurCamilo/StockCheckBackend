import { Request, Response } from 'express';
import { Movement, MovementInput } from '../models/movement.model';
import { Notification } from '../models/notification.model';
import { Product, ProductDocument } from '../models/product.model';


const getMovements = async (req: Request, res: Response) => {
    const movements = await Movement.find().exec();
    return res.status(200).json({ data: movements });
};

const getUpdatedProductQuantity = async (movement: MovementInput, product: ProductDocument) => {
    if (movement.type == "Entrada") {
        return product.quantity + movement.quantity;
    } else if (movement.type == "Saída") {
        return product.quantity - movement.quantity;
    }

    return 0;
}

const editProduct = async (movement: MovementInput) => {
    const product = await Product.findById(movement.product).exec();

    if (!product) return;

    const updatedProductQuantity = await getUpdatedProductQuantity(movement, product);
    await Product.updateOne({ _id: product._id }, {...product, quantity: updatedProductQuantity});
    const updatedProduct = await Product.findById(movement.product).exec();

    if (updatedProductQuantity < product.minQuantity) {
        const notification = { 
            product: updatedProduct, 
            msg: `O produto ${product.name} está abaixo do estoque mínimo`,
            type: 'Min' 
        };
        await Notification.create(notification);
    }

    if (updatedProductQuantity > product.maxQuantity) {
        const notification = { 
            product: updatedProduct, 
            msg: `O produto ${product.name} está acima do estoque máximo`,
            type: 'Max' 
        };
        await Notification.create(notification);
    }
}

const addMovement = async (req: Request, res: Response) => {
    const movementInput = req.body as MovementInput;
    const movementCreated = Movement.create(movementInput);
    editProduct(movementInput);
    return res.status(201).json({ data: movementCreated });
};

export {
    getMovements,
    addMovement,
}