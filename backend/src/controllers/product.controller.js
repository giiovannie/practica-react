import { ProductModel } from "../models/Product.js";
import { matchedData } from "express-validator";

export const getProductById = async(req,res)=>{
    try {
        const {id, ...data} = matchedData(req)
        const product = await ProductModel.findByPk(id)
        return res.status(200).json(product)
    } catch (error) {
        return res.status(500).json({message: "hubo un problema en el servidor", error})
    }
}


export const getAllProducts = async(req,res)=>{
    try {
        const products = await ProductModel.findAll()
        return res.status(200).json(products)
    } catch (error) {
        return res.status(500).json({message: "hubo un problema en el servidor", error})
    }
}

export const createProduct = async(req,res)=>{
    try {
        const newProduct = matchedData(req);
        const createdProduct = await ProductModel.create(newProduct)
        return res.status(201).json({message:"se creo el producto correctamente", createdProduct})
    } catch (error) {
        return res.status(500).json({message: "hubo un problema en el servidor", error})
    }
}

export const updateProduct = async(req,res)=>{
    try {
        const {id, ...data} = matchedData(req)
        const productToUpdate = await ProductModel.findByPk(id)
        const productUpdated = await productToUpdate.update(data)
        return res.status(200).json({message:"el producto fue actualizado correctamente", productUpdated})
    } catch (error) {
        return res.status(500).json({message: "hubo un problema en el servidor", error})
    }
}

export const eliminateProduct = async(req,res)=>{
    try {
        const {id} = matchedData(req)
        const productToELiminate = await ProductModel.findByPk(id)
        const productliminated = await productToELiminate.destroy()
        return res.status(200).json({message:"el producto se borro correctamente", productliminated})
    } catch (error) {
        return res.status(500).json({message: "hubo un problema en el servidor", error})
    }
}
