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
                return "Producto añadido a base de datos"
            }else{
                return `El producto con codigo ${p.code} ya existe en base de datos`
            }
        }else{
            return "Alguno de los campos no fue completado correctamente"
        }
    }

    updateProduct(id,p){
        if (!Object.values(p).includes(null) && !Object.values(p).includes(undefined)){
            let contenido= fs.readFileSync(this.path,"utf-8")
            let aux= JSON.parse(contenido)
                if (aux.some(product=>product.id===parseInt(id))){
                    let indice=aux.findIndex(product=>product.id===parseInt(id))
                    aux[indice].title=p.title
                    aux[indice].description=p.description
                    aux[indice].price=p.price
                    aux[indice].stock=p.stock
                    aux[indice].thumbnails=p.thumbnails
                    aux[indice].status=p.status
                    aux[indice].category=p.category
                    aux[indice].stock=p.stock
                    fs.writeFileSync(this.path,JSON.stringify(aux))
                    return "El producto fue actualizado correctamente en base de datos"
                }else{
                    return "El producto que desea actualizar no existe en base de datos"
                }
            
        }else{
            return "Alguno de los campos del producto a actualizar no fue completado correctamente"
        }
    }

    deleteProduct(id){
        let contenido= fs.readFileSync(this.path,"utf-8")
        let aux= JSON.parse(contenido)
        if (aux.some(product=>product.id===parseInt(id))){
            aux=aux.filter((product)=>product.id!==parseInt(id))
            fs.writeFileSync(this.path,JSON.stringify(aux))
           return "El producto fue eliminado correctamente en base de datos"
        }else{
            return "El producto que desea eliminar no existe en base de datos"
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
        return aux.find((product)=>product.id===parseInt(id))
    }
}

export default ProductManager