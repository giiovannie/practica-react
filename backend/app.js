import  express  from "express";
import dotenv from "dotenv";
import cors from "cors";
import { DataBaseUp } from "./src/config/DataBase.js";
import { RouterUser } from "./src/routes/user.routes.js";
import { RouterProduct } from "./src/routes/product.routes.js";
import { RouterProfile } from "./src/routes/profile.routes.js";
import { RouterFavorite } from "./src/routes/favorite.routes.js";
import "./src/models/index.js";
dotenv.config();

const app = express();

app.use(express.json());

app.use("/api", RouterUser)
app.use("/api", RouterProduct)
app.use("/api", RouterProfile)
app.use("/api", RouterFavorite)

const PORT = process.env.PORT;

app.listen(PORT, async () => {
    try {
        await DataBaseUp()
        console.log(`se ensendio el server correctamente en el puerto ${PORT}`);
    } catch (error) {
        console.error("lo sentimos hemos tenido un problema en iniciar el server :C", error);
    }
})
