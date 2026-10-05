import { body, param } from "express-validator";
import { UserModel } from "../../models/User.js";

export const CreateUserValidation = [
    body("username")
    .notEmpty().withMessage("el user name esta vacio")
    .isString().withMessage("el user name no es del tipo string")
    .isLength({min: 5, max: 15}).withMessage("el username no cumple con los limites de caracteres permitidos")
    .bail()
    .custom(async(username, {req})=>{
        const usernameExist = await UserModel.findOne({where: {username}})
        if(usernameExist && String(usernameExist.id) !== req.params.id) throw new Error("el username ya existe")
        return true
    }),
    body("email")
        .notEmpty().withMessage("el email esta vacio")
        .isEmail().withMessage("el campo no es del tipo email")
        .isString().withMessage("el email no es del tipo string")
        .isLength({min: 10}).withMessage("el email no cumple con los limites de caracteres permitidos")
        .bail()
        .custom(async(email, {req})=>{
            const emailExist = await UserModel.findOne({
                where:{ email }
            })
            if(emailExist && String(emailExist.id) !== req.params.id) throw new Error("el email ya existe")
            return true
        })
        ,
    body("password")
        .notEmpty().withMessage("la password esta vacia")
        .isString().withMessage("La contraseña no es del tipo string")
        .isLength({min: 8, max: 15}).withMessage("la contraseña no cumple con los limites de caracteres permitidos"),
    body("role")
        .isIn(['admin', 'user']).withMessage("el rol no es el esperado intente de nuevo")
        .isString().withMessage("el rol no es del tipo string")
        .notEmpty().withMessage("el rol esta vacio")
]

export const ValidationUserById = [
    param("id")
        .notEmpty().withMessage("el id esta vacio")
        .isInt({min: 1}).withMessage("el id debe ser un numero entero positivo")
        .bail()
        .custom(async(id)=>{
            const userExist = await UserModel.findByPk(id)
            if(!userExist) throw new Error("el id no existe")
            return true
        })
]

export const UpdateUserValidation = [
    ...ValidationUserById,
    body("username")
        .optional()
        .isString().withMessage("el username no es del tipo string")
        .isLength({min: 5, max: 15}).withMessage("el username no cumple con los limites de caracteres permitidos")
        .bail()
        .custom(async(username, {req})=>{
            const usernameExist = await UserModel.findOne({where: {username}})
            if(usernameExist && String(usernameExist.id) !== req.params.id) throw new Error("el username ya existe")
            return true
        }),
    body("email")
        .optional()
        .isString().withMessage("el email no es del tipo string")
        .isEmail().withMessage("el campo no es del tipo email")
        .isLength({min: 10, max: 100}).withMessage("el email no cumple con los limites de caracteres permitidos")
        .bail()
        .custom(async(email, {req})=>{
            const emailExist = await UserModel.findOne({where: {email}})
            if(emailExist && String(emailExist.id) !== req.params.id) throw new Error("el email ya existe")
            return true
        }),
    body("password")
        .optional()
        .isString().withMessage("la password no es del tipo string")
        .isLength({min: 8, max: 15}).withMessage("la password no cumple con los limites de caracteres permitidos"),
    body("role")
        .optional()
        .isString().withMessage("el rol no es del tipo string")
        .isIn(['admin', 'user']).withMessage("el rol no es el esperado intente de nuevo")
]

