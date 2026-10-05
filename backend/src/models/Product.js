import { sequelize } from "../config/DataBase.js";
import { DataTypes } from "sequelize";

export const ProductModel = sequelize.define("products",{
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    categoria:{
        type: DataTypes.ENUM('components', 'periferics', 'technology'),
        allowNull: false,
        defaultValue: "technology"
    },
    cantidad:{
        type: DataTypes.INTEGER(),
        allowNull: false,
        defaultValue: 0
    },
    precio:{
        type: DataTypes.FLOAT(),
        allowNull:false,
    },
    state:{
        type: DataTypes.ENUM("Disponible", "Agotado"),
        allowNull: false,
        defaultValue: "Disponible"
    }
},{
    timestamps: true,
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at"
})