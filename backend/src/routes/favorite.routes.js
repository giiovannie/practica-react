import { Router } from "express";
import { getAllFavorites, getFavoriteById, createFavorite, updateFavorite, eliminateFavorite } from "../controllers/favorite.controller.js";
import { CreateFavoriteValidation, UpdateFavoriteValidation, ValidationFavoriteById } from "../middlewares/validator/favorite.validator.js";
import { validate } from "../middlewares/validate.js";

export const RouterFavorite = Router()

RouterFavorite.get("/favorites", getAllFavorites)
RouterFavorite.get("/favorites/:id", ValidationFavoriteById, validate, getFavoriteById)
RouterFavorite.post("/favorites", CreateFavoriteValidation, validate, createFavorite)
RouterFavorite.put("/favorites/:id", UpdateFavoriteValidation, validate, updateFavorite)
RouterFavorite.delete("/favorites/:id", ValidationFavoriteById, validate, eliminateFavorite)
