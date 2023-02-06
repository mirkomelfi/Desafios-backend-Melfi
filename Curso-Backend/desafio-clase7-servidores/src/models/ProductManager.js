//import {promises as fs} from "fs"
import * as fs from "fs"

class ProductManager {
    constructor(path){
        this.path= path
    }
    
    addProduct(p){
        if (!Object.values(p).includes(null) && !Object.values(p).includes(undefined)){
            let contenido= fs.readFileSync(this.path,"utf-8")
            let aux= JSON.parse(contenido)
            if (!aux.some(product=>product.code===p.code)){
                let idProd=aux.length+1
                aux.push({id:idProd,...p})
                fs.writeFileSync(this.path,JSON.stringify(aux))
                console.log("Producto añadido a base de datos")
            }else{
                console.log("El producto con codigo",p.code,"ya existe en base de datos")
            }
        }else{
            console.log("Alguno de los campos no fue completado correctamente")
        }
    }

    updateProduct(id,p){
        if (!Object.values(p).includes(null) && !Object.values(p).includes(undefined)){
            let contenido= fs.readFileSync(this.path,"utf-8")
            let aux= JSON.parse(contenido)
            if (!aux.some(product=>product.code===p.code)){
                if (aux.some(product=>product.id===id)){
                    let indice=aux.findIndex(product=>product.id===id)
                    aux[indice].title=p.title
                    aux[indice].description=p.description
                    aux[indice].price=p.price
                    aux[indice].code=p.code
                    aux[indice].stock=p.stock
                    fs.writeFileSync(this.path,JSON.stringify(aux))
                    console.log("El producto fue actualizado correctamente en base de datos")
                }else{
                    console.log("El producto que desea actualizar no existe en base de datos")
                }
            }else{
                console.log("El codigo de barras que desea actualizar ya existe en base de datos")
            }
        }else{
            console.log("Alguno de los campos del producto a actualizar no fue completado correctamente")
        }
    }

    deleteProduct(id){
        let contenido= fs.readFileSync(this.path,"utf-8")
        let aux= JSON.parse(contenido)
        if (aux.some(product=>product.id===id)){
            aux=aux.filter((product)=>product.id!==id)
            fs.writeFileSync(this.path,JSON.stringify(aux))
            console.log("El producto fue eliminado correctamente en base de datos")
        }else{
            console.log("El producto que desea eliminar no existe en base de datos")
        }
    }

    getProducts(){
        let contenido= fs.readFileSync(this.path,"utf-8")
        let aux= JSON.parse(contenido)
        return aux
    }

    getProductById(id){
        let contenido= fs.readFileSync(this.path,"utf-8")
        let aux= JSON.parse(contenido)
        return aux.find((product)=>product.id===id)
    }
}

export default ProductManager