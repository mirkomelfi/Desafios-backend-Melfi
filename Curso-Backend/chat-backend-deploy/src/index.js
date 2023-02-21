import express from "express";
import routerProduct from "./routes/productos.routes.js";
import routerSocket from "./routes/socket.routes.js";
import { __dirname } from "./path.js";
import multer from 'multer'
import { engine } from 'express-handlebars';
import * as path from 'path'
import { Server } from "socket.io";


//const upload = multer({dest:'src/public/img'}) Forma basica de utilizar multer
const storage = multer.diskStorage({
  destination: (req,file, cb) => {
    cb(null, 'src/public/img')
  },
  filename: (req,file,cb) => {
    cb(null, `${file.originalname}`)
  }
})

const upload = multer({storage:storage})

const app = express()
const PORT = 4000 

const server = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`)
})

//Middlewares
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views')); //__dirname + './views'

//ServerIO
const io = new Server(server)

const mensajes = []

io.on("connection", (socket) => {
    console.log("Cliente conectado")
    socket.on("mensaje", info => {
      console.log(info)
      mensajes.push(info)
      io.emit("mensajes", mensajes)
    })
})

//Routes
app.use('/', express.static(__dirname + '/public'))
app.use('/api/products', routerProduct)
app.use("/", routerSocket)
app.post('/upload',upload.single('product'), (req,res) => {
    console.log(req.body)
    console.log(req.file)
    res.send("Imagen cargada")
})

