import { Router } from "express";
import { loginUser, registerUser } from "../controllers/session.js";
import { autenticateRolAdmin, autenticateRolUsr } from "../controllers/products.js";
import { addToCart } from "../services/CartServices.js";
import { createProduct, deleteProduct } from "../services/ProductServices.js";

const routerProduct = Router()

routerProduct.post("/regis", registerUser)
routerProduct.post("/login", loginUser)


routerProduct.post("/", autenticateRolUsr, addToCart)

routerProduct.post("/create", autenticateRolAdmin, createProduct)
routerProduct.post("/delete", autenticateRolAdmin, deleteProduct)



export default routerProduct