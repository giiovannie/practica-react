import { matchedData } from "express-validator";
import { FavoriteModel } from "../models/Favorite.js";

export const getAllFavorites = async(req,res)=>{
    try {
        const favorites = await FavoriteModel.findAll()
        return res.status(200).json(favorites)
    } catch (error) {
        return res.status(500).json({message: "hubo un problema en el servidor", error})
    }
}

export const getFavoriteById = async(req,res)=>{
    try {
        const {id} = matchedData(req)
        const favorite = await FavoriteModel.findByPk(id)
        return res.status(200).json(favorite)
    } catch (error) {
        return res.status(500).json({message: "hubo un problema en el servidor", error})
    }
}

export const createFavorite = async(req,res)=>{
    try {
        const data = matchedData(req, {locations: ["body"]})
        const favoriteCreated = await FavoriteModel.create(data)
        return res.status(201).json(favoriteCreated)
    } catch (error) {
        return res.status(500).json({message: "hubo un problema en el servidor", error})
    }
}

export const updateFavorite = async(req,res)=>{
    try {
        const {id} = matchedData(req, {locations: ["params"]})
        const data = matchedData(req, {locations: ["body"]})
        const favoriteToUpdate = await FavoriteModel.findByPk(id)
        const favoriteUpdated = await favoriteToUpdate.update(data)
        return res.status(200).json({message: "el registro fue actualizado correctamente", favoriteUpdated})
    } catch (error) {
        return res.status(500).json({message: "hubo un problema en el servidor", error})
    }
}

export const eliminateFavorite = async(req,res)=>{
    try {
        const {id} = matchedData(req)
        const favoriteToEliminate = await FavoriteModel.findByPk(id)
        await favoriteToEliminate.destroy()
        return res.status(200).json({message: "el registro se borro correctamente"})
    } catch (error) {
        return res.status(500).json({message: "hubo un problema en el servidor", error})
    }
}