import { Router } from "express"
import  CartManager  from "../controllers/CartManager.js";

const routerCart=Router()
const manager=new CartManager("src/models/Carts.txt")


routerCart.get("/", async (req,res)=> {
    const mensaje=  await manager.getCarts()
    res.send(mensaje)
})

routerCart.get("/:cid", async (req,res)=> {
    const cart=  await manager.getCartById(req.params.cid)
    if (cart){
        res.send(cart.products)
    }else{
        res.send("Not found")
    }
})
routerCart.post("/:cid/product/:pid", async (req,res)=> {
    const mensaje=  await manager.addProduct(req.params.cid,req.params.pid)
    res.send(mensaje)
})


routerCart.post('/', async (req, res) => { 
    let mensaje = await manager.addCart(req.body) // no hace falta el body?
    res.send(mensaje)
})


export default routerCart