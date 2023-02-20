import express from "express"
import routerProduct from "./routes/products.routes.js";
import routerCart from "./routes/cart.routes.js";
import { __dirname } from "./path.js";
import multer from 'multer'
import { engine } from "express-handlebars";
import * as path from 'path'
import { Server } from "socket.io";

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

const server= app.listen(PORT,()=>{
  console.log("Server on Port",PORT)
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));

const io=new Server(server)

io.on("connection", (socket) => { 
  console.log("Cliente conectado")

  socket.on("mensaje", info => {
    console.log(info) // recibo de mi cliente y visualizo en terminal
  })  

  socket.emit("producto-agregado", []) // si agrego producto se modificara aqui (visualizo en consola navegador)
  socket.emit("producto-eliminado", []) // si elimino producto se modificara aqui (visualizo en consola navegador)

  socket.broadcast.emit("mensaje-socket-propio", "Hola, desde mensaje socket propio") 

})

app.use('/', express.static(__dirname + '/public'))
app.use('/realTimeProducts', express.static(__dirname + '/public'))
app.use('/api/products', routerProduct)
app.use('/api/carts', routerCart)


let productos=[{"id":1,"title":"Iphone 8","description":"Soporta IOS 8 o +","price":1200,"thumbnails":["iphone8.jpg"],"status":true,"category":"Celulares","code":"122563456","stock":1345},{"id":2,"title":"Iphone X","description":"Soporta IOS 14 o +","price":1200,"thumbnails":["iphoneX.jpg"],"status":true,"category":"Celulares","code":"122222563456","stock":34}]
  
app.get("/",(req,res)=>{
  res.render("home",{
    productos
  })
})

app.get("/realTimeProducts",(req,res)=>{
  res.render("realTimeProducts",{
    productos
  })
})