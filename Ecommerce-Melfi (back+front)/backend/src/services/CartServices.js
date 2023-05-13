import cartModel from "../models/MongoDB/cartModel.js";

/*
findCartById
addProductCart
addProductsCart
deleteProductCart
updateProductCart
deleteElementsCart
createCart
*/

export const findCartById = async (id) => {
    try {
        const user = await cartModel.findById(id)
        return user
    } catch (error) {
        throw new Error(error)
    }
}


export const addProductCart = async (idCart,idProduct,quantity) => { //agregar try catch
    const cart= await cartModel.findById(idCart)
    const arrayProductos= cart.products

    if (arrayProductos.some(producto=>producto.productId==idProduct)){
        const productWanted= arrayProductos.find(prod=>prod.productId==idProduct)
        productWanted.quantity=productWanted.quantity+parseInt(quantity)
    }else{
        arrayProductos.push({productId:idProduct,quantity:quantity}) // checkear
    }

    cart.products=arrayProductos
    const cartUpdated= await cartModel.findByIdAndUpdate(idCart,cart)
    return cartUpdated
}
/*
export const addProductsCart = async (idCart,newArrayProducts) => {
    const cart= await cartModel.findById(idCart)
    if(cart){
        cart.products=newArrayProducts
        return cart
    }
    return -1

}

export const deleteProductCart = async  (idCart,idProduct) => {
    //agregar logica si no existe el cart ingresado
    const cart= await cartModel.findById(idCart)
    const arrayProductos= cart.products
    if (arrayProductos.some(producto=>producto.productId==idProduct)){
        const arrayUpdated=arrayProductos.filter(producto=>producto.productId!==idProduct)
        cart.products=arrayUpdated
        return cart
    }
    return -1
}

export const updateProductCart  = async (idCart,idProduct,newQuantity)=> {
    const cart= await cartModel.findById(idCart)
    const arrayProductos= cart.products
    if (arrayProductos.some(producto=>producto.productId==idProduct)){
        const productWanted= arrayProductos.find(prod=>prod.productId===idProduct)
        productWanted.quantity=newQuantity
        cart.products=arrayProductos
        return cart
    }
    return -1
}

export const deleteElementsCart = async (idCart)=> {
    const cart= await cartModel.findById(idCart)
    if(cart){
        cart.products=[]
        return cart
    }
    return -1
}
*/
export const createCart = async (cart) => { // implementar en el registro del usuario??
    //Errores de datos a enviar a mi BDD
    try {
        const newCart = await cartModel(cart)
        await newCart.save()
        return newCart
    } catch (error) {
        throw new Error(error)
    }
}

