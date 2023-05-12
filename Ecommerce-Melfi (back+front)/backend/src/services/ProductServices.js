import productModel from "../models/MongoDB/productModel.js";


export const findProducts = async () => {

    try {
        const products = await productModel.find()
        return products
    } catch (error) {
        throw new Error(error)
    }
}
/*

async getProducts(params){
    super.setConnection()
    let {limit,page,sort,category}=params
    if (category){
        if (sort==="1"||sort==="-1"){
            return await this.model.paginate({category},{sort:{price:parseInt(sort)},limit:limit||10,page:page||1})
        }else{
            return await this.model.paginate({category},{limit:limit||10,page:page||1})
        }
    }else{
        if (sort==="1"||sort==="-1"){
            return await this.model.paginate({},{sort:{price:parseInt(sort)},limit:limit||10,page:page||1})
        }else{
            return await this.model.paginate({},{limit:limit||10,page:page||1})
        }
    }
}*/

export const findProductById = async (id) => {
    try {
        const product = await productModel.findById(id)
        return product
    } catch (error) {
        throw new Error(error)
    }
}


export const createProduct = async (product) => {
    //Errores de datos a enviar a mi BDD
    try {
        const newproduct = await userModel(product)
        await newproduct.save()
        return newproduct
    } catch (error) {
        throw new Error(error)
    }
}

/*

export const addProduct = async (req, res) => {
    const {title,description,code,price,status,stock,category,thumbnails } = req.body
    try {
        const product = await productModel.addElements([{title,description,code,price,status,stock,category,thumbnails}])
        return product
    } catch (error) {
        throw new Error(error)
    }
}


export const updateProduct = async (req, res) => {
    const { id } = req.params
    const { title,description,code,price,status,stock,category,thumbnails } = req.body
    try {
        const product = await productManager.updateElement(id, {title,description,code,price,status,stock,category,thumbnails})

        if (product) {
            return res.status(200).json({
                message: "Producto actualizado"
            })
        }

        res.status(200).json({
            message: "Producto no encontrado"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

}

export const deleteProduct = async (req, res) => {
    try {
        const product = await productManager.deleteElement(req.params.id)
        if (product) {
            return res.status(200).json({
                message: "Producto eliminado"
            })
        }
        res.status(200).json({
            message: "Producto no encontrado"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

*/
export const deleteProduct = async (product) => {
    //Errores de datos a enviar a mi BDD
    return 1
}
