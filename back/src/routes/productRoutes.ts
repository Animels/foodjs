import { createProduct, deleteProduct, getProduct, updateProduct } from '@controllers';
import express from 'express';

const productRouter = express.Router();

productRouter.get('/product/:id', getProduct);
productRouter.post('/product', createProduct);
productRouter.patch('/product', updateProduct);
productRouter.delete('/product/:id', deleteProduct);

export { productRouter };
