import { body, param } from "express-validator";
import { ProductModel } from "../../models/Product.js";
import { UserModel } from "../../models/User.js";

const ValidationProductUser = body("user_id")
    .optional()
    .isInt({min: 1}).withMessage("el user_id debe ser un numero entero positivo")
    .bail()
    .custom(async(id)=>{
        const userExist = await UserModel.findByPk(id)
        if(!userExist) throw new Error("el usuario no existe")
        return true
    })

export const CreateProductValidation = [
    ValidationProductUser,
    body("nombre")
        .notEmpty().withMessage("el nombre esta vacio")
        .isString().withMessage("el nombre no es del tipo string")
        .isLength({min: 1, max: 100}).withMessage("el nombre no cumple con los limites de caracteres permitidos")
        .bail()
        .custom(async(nombre, {req})=>{
            const nombreExist = await ProductModel.findOne({
                where:{ nombre }
            })
            if(nombreExist && String(nombreExist.id) !== req.params.id) throw new Error("el nombre ya existe")
            return true
        }),
    body("categoria")
        .notEmpty().withMessage("la categoria esta vacia")
        .isString().withMessage("la categoria no es del tipo string")
        .isIn(['components', 'periferics','technology']).withMessage("la categoria no es la esperada intente de nuevo"),
    body("cantidad")
        .notEmpty().withMessage("la cantidad esta vacia")
        .isInt({min: 0}).withMessage("la cantidad debe ser un numero entero mayor o igual a cero"),
    body("precio")
        .notEmpty().withMessage("el precio esta vacio")
        .isFloat({min: 0}).withMessage("el precio debe ser un numero mayor o igual a cero"),
    body("state")
        .notEmpty().withMessage("el estado esta vacio")
        .isString().withMessage("el estado no es del tipo string")
        .isIn(['Disponible', 'Agotado']).withMessage("el estado no es el esperado intente de nuevo")
]

export const UpdateProductValidation = [
    ValidationProductUser,
    param("id")
        .isInt().withMessage("el id no es del tipo numerico")
        .notEmpty().withMessage("el id no debe de estar vacio")
        .bail()
        .custom(async(id)=>{
            const idExist = await ProductModel.findByPk(id);

            if(!idExist) throw new Error("el id no existe")
            
            return true ;
        }),
    body("nombre")
        .optional()
        .isString().withMessage("el nombre no es del tipo string")
        .isLength({min: 1, max: 100}).withMessage("el nombre no cumple con los limites de caracteres permitidos")
        .bail()
        .custom(async(nombre, {req})=>{
            const nombreExist = await ProductModel.findOne({
                where:{ nombre }
            })
            if(nombreExist && String(nombreExist.id) !== req.params.id) throw new Error("el nombre ya existe")
            return true
        }),
    body("categoria")
        .optional()
        .isString().withMessage("la categoria no es del tipo string")
        .isIn(['components', 'periferics', 'technology']).withMessage("la categoria no es la esperada intente de nuevo"),
    body("cantidad")
        .optional()
        .isInt({min: 0}).withMessage("la cantidad debe ser un numero entero mayor o igual a cero"),
    body("precio")
        .optional()
        .isFloat({min: 0}).withMessage("el precio debe ser un numero mayor o igual a cero"),
    body("state")
        .optional()
        .isString().withMessage("el estado no es del tipo string")
        .isIn(['Disponible', 'Agotado']).withMessage("el estado no es el esperado intente de nuevo")
]

export const ValidationProductById = [
    param("id")
        .isInt().withMessage("el id no es del tipo numerico")
        .notEmpty().withMessage("el id no debe de estar vacio")
        .bail()
        .custom(async(id)=>{
            const idExist = await ProductModel.findByPk(id);

            if(!idExist) throw new Error("el id no existe")
            
            return true ;
        })
]
