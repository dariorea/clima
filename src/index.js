import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import climaRoutes from "./routes/clima.routes.js"

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.static("public"));
app.use(cors());

const PORT = process.env.PORT || 3001;

app.use("/clima", climaRoutes)

app.listen(PORT, () => {
    console.log(`escuchando desde el puerto ${PORT}`)
})