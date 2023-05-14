import { Router } from "express";
import { finalizarCompra, getCartById,getCarts } from "../controllers/cart.js";


const routerCart = Router()

routerCart.get("/", getCarts)
routerCart.get("/:cid",getCartById)
routerCart.get("/:cid/purchase", finalizarCompra) 

/*
no se si irian implementadas aca o en el usuario xq es el manejo que cada usr tiene sobre su cart

routerCart.post("/:cid/product/:pid", addProductCart) 
routerCart.delete("/:cid/product/:pid",deleteProductCart)
routerCart.put("/:cid",addProductsCart)
routerCart.put("/:cid/product/:pid",updateProductCart)
routerCart.delete("/:cid",deleteCart)
*/


export default routerCart