const socket = io()

/*
const form=document.getElementById(idForm)
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    //console.log(e.target)
    socket.emit("producto-nuevo","producto")
})
*/

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