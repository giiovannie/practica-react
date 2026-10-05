import { body, param } from "express-validator";
import { ProfileModel } from "../../models/Profile.js";
import { UserModel } from "../../models/User.js";

export const ValidationProfileById = [
    param("id")
        .notEmpty().withMessage("el id esta vacio")
        .isInt({min: 1}).withMessage("el id debe ser un numero entero positivo")
        .bail()
        .custom(async(id)=>{
            const idExist = await ProfileModel.findByPk(id)
            if(!idExist) throw new Error("el id no existe")
            return true
        })
]

export const CreateProfileValidation = [
    body("nombre")
        .notEmpty().withMessage("el nombre esta vacio")
        .isString().withMessage("el nombre no es del tipo string")
        .isLength({min: 1, max: 100}).withMessage("el nombre no cumple con los limites de caracteres permitidos"),
    body("apellido")
        .notEmpty().withMessage("el apellido esta vacio")
        .isString().withMessage("el apellido no es del tipo string")
        .isLength({min: 1, max: 100}).withMessage("el apellido no cumple con los limites de caracteres permitidos"),
    body("edad")
        .notEmpty().withMessage("la edad esta vacia")
        .isInt({min: 0}).withMessage("la edad debe ser un numero entero mayor o igual a cero"),
    body("telefono")
        .optional({values: "null"})
        .isString().withMessage("el telefono no es del tipo string")
        .isLength({min: 1, max: 20}).withMessage("el telefono no cumple con los limites de caracteres permitidos"),
    body("direccion")
        .optional({values: "null"})
        .isString().withMessage("el direccion no es del tipo string")
        .isLength({min: 1, max: 150}).withMessage("el direccion no cumple con los limites de caracteres permitidos"),
    body("user_id")
        .notEmpty().withMessage("el user_id esta vacio")
        .isInt({min: 1}).withMessage("el user_id debe ser un numero entero positivo")
        .bail()
        .custom(async(id, {req})=>{
            const idExist = await UserModel.findByPk(id)
            if(!idExist) throw new Error("el user_id no existe")
            const profileExist = await ProfileModel.findOne({where: {user_id: id}})
            if(profileExist && String(profileExist.id) !== req.params.id) throw new Error("el usuario ya tiene un perfil")
            return true
        })
]

export const UpdateProfileValidation = [
    ...ValidationProfileById,
    body("nombre")
        .optional({values: "null"})
        .isString().withMessage("el nombre no es del tipo string")
        .isLength({min: 1, max: 100}).withMessage("el nombre no cumple con los limites de caracteres permitidos"),
    body("apellido")
        .optional({values: "null"})
        .isString().withMessage("el apellido no es del tipo string")
        .isLength({min: 1, max: 100}).withMessage("el apellido no cumple con los limites de caracteres permitidos"),
    body("edad")
        .optional()
        .isInt({min: 0}).withMessage("la edad debe ser un numero entero mayor o igual a cero"),
    body("telefono")
        .optional({values: "null"})
        .isString().withMessage("el telefono no es del tipo string")
        .isLength({min: 1, max: 20}).withMessage("el telefono no cumple con los limites de caracteres permitidos"),
    body("direccion")
        .optional({values: "null"})
        .isString().withMessage("el direccion no es del tipo string")
        .isLength({min: 1, max: 150}).withMessage("el direccion no cumple con los limites de caracteres permitidos"),
    body("user_id")
        .optional()
        .isInt({min: 1}).withMessage("el user_id debe ser un numero entero positivo")
        .bail()
        .custom(async(id, {req})=>{
            const idExist = await UserModel.findByPk(id)
            if(!idExist) throw new Error("el user_id no existe")
            const profileExist = await ProfileModel.findOne({where: {user_id: id}})
            if(profileExist && String(profileExist.id) !== req.params.id) throw new Error("el usuario ya tiene un perfil")
            return true
        })
]
