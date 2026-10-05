import { validationResult } from "express-validator";

export const validate = async (req, res, next)=>{
    const errors  = validationResult(req);
  if (!errors.isEmpty()) {
    const custom = errors.formatWith((err) => {
      return `${err.path}: ${err.msg}`;
    });

    return res.status(400).json(custom.array());
  }
  next();
}