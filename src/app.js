import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";

// Initializar dotenv
dotenv.config();

// Variables de entorno
const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

// Conexión a la base de datos
const connection = mongoose.connect(MONGO_URI);

connection
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((err) => {
    console.log("Error al conectar a la base de datos", err);
  });

//Template engine
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.engine(
  "handlebars",
  handlebars.engine({
    defaultLayout: "main.handlebars",
    extname: "hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);

// Middlewares
app.use(express.json());
app.use("/api/carts/", cartsRouter);
app.use("/api/products/", productsRouter);
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// Servidor
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando peticiones desde el puerto ${PORT}`);
});

// async function enviroment() {
//   const response = await fetch("http://localhost:8080/api/carts");
//   const carts = await response.json();
//   console.log(carts);
//   const lastCart = carts[carts.length - 1];
//   console.log(lastCart);
// }

// enviroment();
