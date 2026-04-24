import express from 'express';
import { getAllProducts, getProductById, newProduct, replaceProduct } from '../controllers/productController.js';


const productRouters = express.Router();

// GET /api/products
productRouters.get('/', getAllProducts);
productRouters.get('/:id', getProductById);
productRouters.post('/', newProduct);
roductRouters.put('/:id', replaceProduct);

export default productRouters;