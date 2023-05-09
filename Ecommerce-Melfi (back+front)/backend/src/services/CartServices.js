import cartModel from "../models/MongoDB/cartModel.js";


export const findCartById = async (id) => {
    try {
        const user = await cartModel.findById(id)
        return user
    } catch (error) {
        throw new Error(error)
    }
}

export const createCart = async (cart) => {
    //Errores de datos a enviar a mi BDD
    try {
        const newCart = await cartModel(cart)
        await newCart.save()
        return newCart
    } catch (error) {
        throw new Error(error)
    }
}


export const addToCart = async (id) => {
     
     return
}