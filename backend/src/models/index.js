import { ProductModel } from "./Product.js";
import {UserModel} from "./User.js" 
import { ProfileModel } from "./Profile.js";
import { FavoriteModel } from "./Favorite.js";

// 1:1
UserModel.hasOne(ProfileModel,{foreignKey: "user_id", as: "profile"})
ProfileModel.belongsTo(UserModel,{foreignKey: "user_id", as: "user"})

//1:n
UserModel.hasMany(ProductModel, {foreignKey: "user_id",as: "products"})
ProductModel.belongsTo(UserModel, {foreignKey: "user_id", as: "user"})

//n:m
UserModel.belongsToMany(ProductModel, {through: FavoriteModel,foreignKey: "user_id",as: "favoriteProducts"})
ProductModel.belongsToMany(UserModel, {through: FavoriteModel,foreignKey: "product_id", as: "usersWhoFavorited"})