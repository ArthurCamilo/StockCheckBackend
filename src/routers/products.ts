import express from 'express'
import { addProduct, deleteProduct, editProduct, getProducts } from '../controllers/products.controller'

export const productsRouter = express.Router()

productsRouter.get('/products', getProducts)

productsRouter.post('/products', addProduct)

productsRouter.put('/products/:id', editProduct)

productsRouter.delete('/products/:id', deleteProduct)