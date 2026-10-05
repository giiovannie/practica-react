import { Router } from "express";
import { getAllProfiles, getProfileById, createProfile, updateProfile, eliminateProfile } from "../controllers/profile.controller.js";
import { CreateProfileValidation, UpdateProfileValidation, ValidationProfileById } from "../middlewares/validator/profile.validator.js";
import { validate } from "../middlewares/validate.js";

export const RouterProfile = Router()

RouterProfile.get("/profiles", getAllProfiles)
RouterProfile.get("/profiles/:id", ValidationProfileById, validate, getProfileById)
RouterProfile.post("/profiles", CreateProfileValidation, validate, createProfile)
RouterProfile.put("/profiles/:id", UpdateProfileValidation, validate, updateProfile)
RouterProfile.delete("/profiles/:id", ValidationProfileById, validate, eliminateProfile)
