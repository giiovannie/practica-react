import { matchedData } from "express-validator";
import { ProfileModel } from "../models/Profile.js";

export const getAllProfiles = async(req,res)=>{
    try {
        const profiles = await ProfileModel.findAll()
        return res.status(200).json(profiles)
    } catch (error) {
        return res.status(500).json({message: "hubo un problema en el servidor", error})
    }
}

export const getProfileById = async(req,res)=>{
    try {
        const {id} = matchedData(req)
        const profile = await ProfileModel.findByPk(id)
        return res.status(200).json(profile)
    } catch (error) {
        return res.status(500).json({message: "hubo un problema en el servidor", error})
    }
}

export const createProfile = async(req,res)=>{
    try {
        const data = matchedData(req, {locations: ["body"]})
        const profileCreated = await ProfileModel.create(data)
        return res.status(201).json(profileCreated)
    } catch (error) {
        return res.status(500).json({message: "hubo un problema en el servidor", error})
    }
}

export const updateProfile = async(req,res)=>{
    try {
        const {id} = matchedData(req, {locations: ["params"]})
        const data = matchedData(req, {locations: ["body"]})
        const profileToUpdate = await ProfileModel.findByPk(id)
        const profileUpdated = await profileToUpdate.update(data)
        return res.status(200).json({message: "el registro fue actualizado correctamente", profileUpdated})
    } catch (error) {
        return res.status(500).json({message: "hubo un problema en el servidor", error})
    }
}

export const eliminateProfile = async(req,res)=>{
    try {
        const {id} = matchedData(req)
        const profileToEliminate = await ProfileModel.findByPk(id)
        await profileToEliminate.destroy()
        return res.status(200).json({message: "el registro se borro correctamente"})
    } catch (error) {
        return res.status(500).json({message: "hubo un problema en el servidor", error})
    }
}
