import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config()

export const sequelize = new Sequelize(process.env.DB_NAME , process.env.DB_USER, process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect: "mysql"
})

export const DataBaseUp = async ()=>{
    try {
        await sequelize.authenticate()
        await sequelize.sync({force:false})
        console.log("conexion a la base de datos exitosa :)");
    } catch (error) {
        console.log("lo sentimos no pudimos conectarnos con la base de datos :(", error);
    }
}