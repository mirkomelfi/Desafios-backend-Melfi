const socket = io()

const agregarProducto = document.getElementById("agregarProducto")
const eliminarProducto = document.getElementById("eliminarProducto")
const listaProductos = document.getElementById("listaProductos")

const title = document.getElementById("title")
const description = document.getElementById("description")
const price = document.getElementById("price")
const stock = document.getElementById("stock")
const thumbnails = document.getElementById("thumbnails")
const status = document.getElementById("status")
const category = document.getElementById("category")
const idProd = document.getElementById("idProd")

const isOk=(val)=>{
    if (val.value.trim().length > 0){
        return true
    }else{
        return false
    }
}

agregarProducto.addEventListener("click", () => {
    if (isOk(title)&&isOk(description)&&isOk(price)&&isOk(stock)&&isOk(thumbnails)&&isOk(status)&&isOk(category)){
        socket.emit("producto-agregar", {title:title.value,description:description.value,price:price.value,stock:stock.value,thumbnails:thumbnails.value,status:status.value,category:category.value,
    })}// al tocar el boton agregar, envio al server el producto a agregar
})

socket.on("producto-agregado", arrayProductos => { // recibo el array actualizado de mi server y lo muestro en pantalla
    listaProductos.innerHTML = "" 
    arrayProductos.forEach(producto => {
        listaProductos.innerHTML +=`<p>Id de Producto: ${producto.id} <p>Title: ${producto.title} </p><p>Description: ${producto.description} </p><p>Price: ${producto.price} </p>
        <p>Stock: ${producto.stock} </p> <p>Thumbnails: ${producto.thumbnails} </p> <p>Status: ${producto.status} </p> <p>Category:${producto.category} </p> <br>`
    });
})

eliminarProducto.addEventListener("click", () => {
    if (isOk(idProd)){
        socket.emit("producto-eliminar", idProd.value
    )} // al tocar el boton eliminar, envio al server el id del producto que deseo eliminar  
})

socket.on("producto-eliminado", arrayProductos => { // recibo el array actualizado de mi server y lo muestro en pantalla
    listaProductos.innerHTML = "" 
    arrayProductos.forEach(producto => {
        listaProductos.innerHTML +=`<p>Id de Producto: ${producto.id} <p>Title: ${producto.title} </p><p>Description: ${producto.description} </p><p>Price: ${producto.price} </p>
        <p>Stock: ${producto.stock} </p> <p>Thumbnails: ${producto.thumbnails} </p> <p>Status: ${producto.status} </p> <p>Category:${producto.category} </p> <br>`
    });
})


/*
socket.emit("mensaje", "Primer mensaje al server")  //envio info al server  (visualizo en terminal)

socket.on("producto-agregado", info => { 
    console.log(info) //recibo info del server  (visualizo en consola navegador)
})

socket.on("producto-eliminado", info => {
    console.log(info) //recibo info del server  (visualizo en consola navegador)
})

socket.on("mensaje-socket-propio", info => {
    console.log(info)
})
*/