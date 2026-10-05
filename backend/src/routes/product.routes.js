import { Router } from "express";
import { createProduct, eliminateProduct, getAllProducts, getProductById, updateProduct } from "../controllers/product.controller.js";
import { CreateProductValidation, UpdateProductValidation, ValidationProductById } from "../middlewares/validator/product.validator.js";
import {validate} from '../middlewares/validate.js'
export const RouterProduct = Router()

RouterProduct.get("/products", getAllProducts)
RouterProduct.get("/products/:id", ValidationProductById, validate, getProductById)
RouterProduct.post("/products", CreateProductValidation, validate, createProduct);
RouterProduct.put("/products/:id", UpdateProductValidation, validate, updateProduct);
RouterProduct.delete("/products/:id", ValidationProductById, validate, eliminateProduct)
