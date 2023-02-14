import express from "express"
import routerProduct from "./routes/products.routes.js";
import routerCart from "./routes/cart.routes.js";
import { __dirname } from "./path.js";
import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req,file, cb) => {
      cb(null, 'src/public/img')
    },
    filename: (req,file,cb) => {
      cb(null, `${file.originalname}`)
    }
  })

const upload = multer({storage:storage})

const app=express()
const PORT=8080


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/static', express.static(__dirname + '/public'))

app.use('/api/products', routerProduct)
app.use('/api/carts', routerCart)

app.listen(PORT,()=>{
    console.log("Server on Port",PORT)
})