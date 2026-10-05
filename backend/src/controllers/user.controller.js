import { matchedData } from "express-validator";
import { UserModel } from "../models/User.js";

export const getUserById = async(req,res)=>{
    try {
        const {id, ...data} = matchedData(req)
        const user = await UserModel.findByPk(id)
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message: "hubo un problema en el servidor", error})
    }
}

export const updateUser = async(req,res)=>{
    try {
        const {id, ...data} = matchedData(req)
        const user = await UserModel.findByPk(id)
        const userUpdated = await user.update(data)
        return res.status(200).json({message: "el registro fue actualizado correctamente", userUpdated})
    } catch (error) {
        return res.status(500).json({message: "hubo un problema en el servidor", error})
    }
}

export const eliminateUser = async(req,res)=>{
    try {
        const {id, ...data} = matchedData(req)
        const user = await UserModel.findByPk(id)
        await user.destroy()
        return res.status(200).json({message: "el registro se borro correctamente"})
    } catch (error) {
        return res.status(500).json({message: "hubo un problema en el servidor", error})
    }
}

export const getAllUsers = async(req,res)=>{
    try {
        const users = await UserModel.findAll()
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({message: "hubo un problema en el servidor", error})
    }
}

export const createUser = async(req,res)=>{
    try {
        const data = matchedData(req)
        const userCreated = await UserModel.create(data)
        return res.status(201).json(userCreated)
    } catch (error) {
        return res.status(500).json({message: "hubo un problema en el servidor", error})
    }
}
