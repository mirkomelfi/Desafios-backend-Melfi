import * as fs from "fs"

class CartManager {
    constructor(path){
        this.path= path
    }
    
    addCart(){ 
        //consulte si se debia poder inicializar con productos, pero no obtuve rpta por la 
        //plataforma, por lo que hice que al crear un carrito se cree vacio. cualquier cosa lo cambio
        let contenido= fs.readFileSync(this.path,"utf-8")
        let aux= JSON.parse(contenido)
        let idCart=aux.length+1
        aux.push({id:idCart,products:[]})
        fs.writeFileSync(this.path,JSON.stringify(aux))
        return "Carrito añadido a base de datos"
    }

    addProduct(idCart,idProd){
        let contenido= fs.readFileSync(this.path,"utf-8")
        let aux= JSON.parse(contenido)
        if (aux.some(cart=>cart.id===parseInt(idCart))){
            let index= aux.findIndex((cart)=>cart.id===parseInt(idCart)) 
            let arrayProductos= aux[index].products
            if (arrayProductos.some(prod=>prod.product===parseInt(idProd))){
                const producto= arrayProductos.find(prod=>prod.product===parseInt(idProd))
                producto.quantity++
            }else{
                let product={
                    product: parseInt(idProd),
                    quantity:1
                }
                aux[index].products.push(product)
            }

            fs.writeFileSync(this.path,JSON.stringify(aux))
            return "Producto añadido al carrito"
        }else{
            return "Carrito no existe"
        }
    }

    getCarts(){
        let contenido= fs.readFileSync(this.path,"utf-8")
        let aux= JSON.parse(contenido)
        return aux
    }

    getCartById(id){
        let contenido= fs.readFileSync(this.path,"utf-8")
        let aux= JSON.parse(contenido)
        const cart= aux.find((cart)=>cart.id===parseInt(id))
        return cart
    }
}

export default CartManager