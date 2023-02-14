import { Router } from "express"
import  ProductManager  from "../controllers/ProductManager.js";

const routerProduct=Router()
const manager=new ProductManager("src/models/Products.txt")


routerProduct.get("/", async (req,res)=> {
    const arrayProducts=  await manager.getProducts()
    let {limit}=req.query
    if (limit){
        const products=arrayProducts.slice(0,limit)
        res.send(products)
    }else{
        res.send(arrayProducts)
    }
})

routerProduct.get("/:pid", async (req,res)=> {
    const arrayProducts=  await manager.getProducts()
    const pid=req.params.pid
    const result=arrayProducts.find(product=>product.id===parseInt(pid))
    if (result){
        res.send(result)
    }else{
        res.send("Not found")
    }
})

routerProduct.post('/', async (req, res) => { 
    let mensaje = await manager.addProduct(req.body)
    res.send(mensaje)
})
  
routerProduct.delete('/:pid', async (req, res) => {
    console.log(req.params.id)
    let mensaje = await manager.deleteProduct(req.params.pid) 
    res.send(mensaje)
})
  
routerProduct.put('/:pid', async (req, res) => { 
    let mensaje = await manager.updateProduct(req.params.pid, req.body)
    res.send(mensaje)
})

export default routerProduct