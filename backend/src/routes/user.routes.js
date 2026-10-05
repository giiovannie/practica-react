import {Router} from "express";
import { createUser, getAllUsers, getUserById, updateUser, eliminateUser } from "../controllers/user.controller.js";
import { CreateUserValidation, UpdateUserValidation, ValidationUserById } from "../middlewares/validator/user.validator.js";
import {validate} from "../middlewares/validate.js"

export const RouterUser = Router()

RouterUser.get("/users", getAllUsers)
RouterUser.post("/users", CreateUserValidation, validate, createUser)
RouterUser.get("/users/:id", ValidationUserById, validate, getUserById)
RouterUser.put("/users/:id", UpdateUserValidation, validate, updateUser)
RouterUser.delete("/users/:id", ValidationUserById, validate, eliminateUser)
