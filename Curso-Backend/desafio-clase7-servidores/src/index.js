import express from "express"
import Product from "./models/Product.js"
import ProductManager from "./models/ProductManager.js"

const app=express()
const PORT=4000


const manager=new ProductManager("./Products.txt");
const p1=new Product("Iphone 7","Soporta IOS 7 o +",1200,"../assets/iphone7.jpg",122223456,1)
const p2=new Product("Iphone X","Soporta IOS 8 o +",5660,"../assets/iphonex.jpg",125223456,71)
const p3=new Product("Iphone 14","Soporta unicamente IOS 16",12000,"../assets/iphone14pro.jpg",129923456,2)
//manager.addProduct(p1)
console.log("-------------")
//manager.addProduct(p2)
console.log("-------------")
//manager.addProduct(p3)
console.log("-------------")

app.listen(PORT,()=>{
    console.log("Server on Port",PORT)
})

app.get("/",(req,res)=> {
    res.send("Home")
})

app.get("/products", async (req,res)=> {
    const arrayProducts=  await manager.getProducts()
    let {limit}=req.query
    if (limit){
        const products=arrayProducts.slice(0,limit)
        res.send(products)
    }else{
        res.send(arrayProducts)
    }
})

app.get("/products/:pid", async (req,res)=> {
    const arrayProducts=  await manager.getProducts()
    const pid=req.params.pid
    const result=arrayProducts.find(product=>product.id===parseInt(pid))
    if (result){
        res.send(result)
    }else{
        res.send("Not found")
    }
})