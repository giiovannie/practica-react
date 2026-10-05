import { body, param } from "express-validator";
import { FavoriteModel } from "../../models/Favorite.js";
import { UserModel } from "../../models/User.js";
import { ProductModel } from "../../models/Product.js";

export const ValidationFavoriteById = [
    param("id")
        .notEmpty().withMessage("el id esta vacio")
        .isInt({ min: 1 }).withMessage("el id debe ser un numero entero positivo")
        .bail()
        .custom(async(id)=>{
            const favoriteExist = await FavoriteModel.findByPk(id)
            if(!favoriteExist) throw new Error("el favorito no existe")
            return true
        })
]

export const CreateFavoriteValidation = [
    body("user_id")
        .notEmpty().withMessage("el user_id esta vacio")
        .isInt({ min: 1 }).withMessage("el user_id debe ser un numero entero positivo")
        .bail()
        .custom(async(id)=>{
            const userExist = await UserModel.findByPk(id)
            if(!userExist) throw new Error("el usuario no existe")
            return true
        }),
    body("product_id")
        .notEmpty().withMessage("el product_id esta vacio")
        .isInt({ min: 1 }).withMessage("el product_id debe ser un numero entero positivo")
        .bail()
        .custom(async(id)=>{
            const productExist = await ProductModel.findByPk(id)
            if(!productExist) throw new Error("el producto no existe")
            return true
        })
        .custom(async(product_id,{req})=>{
            const favoriteExist = await FavoriteModel.findOne({
                where:{
                    user_id: req.body.user_id,
                    product_id
                }
            })
            if(favoriteExist) throw new Error("el producto ya esta en los favoritos del usuario")
            return true
        })
]

export const UpdateFavoriteValidation = [
    param("id")
        .notEmpty().withMessage("el id esta vacio")
        .isInt({ min: 1 }).withMessage("el id debe ser un numero entero positivo")
        .bail()
        .custom(async(id)=>{
            const favoriteExist = await FavoriteModel.findByPk(id)
            if(!favoriteExist) throw new Error("el favorito no existe")
            return true
        }),
    body("user_id")
        .optional()
        .isInt({ min: 1 }).withMessage("el user_id debe ser un numero entero positivo")
        .bail()
        .custom(async(id)=>{
            const userExist = await UserModel.findByPk(id)
            if(!userExist) throw new Error("el usuario no existe")
            return true
        }),
    body("product_id")
        .optional()
        .isInt({ min: 1 }).withMessage("el product_id debe ser un numero entero positivo")
        .bail()
        .custom(async(id)=>{
            const productExist = await ProductModel.findByPk(id)
            if(!productExist) throw new Error("el producto no existe")
            return true
        })
]