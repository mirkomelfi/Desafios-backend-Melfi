import productModel from "../models/MongoDB/productModel.js";


export const findProducts = async () => {

    try {
        const products = await productModel.find()
        return products
    } catch (error) {
        throw new Error(error)
    }
}

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

export const deleteProduct = async (product) => {
    //Errores de datos a enviar a mi BDD
    return
}
