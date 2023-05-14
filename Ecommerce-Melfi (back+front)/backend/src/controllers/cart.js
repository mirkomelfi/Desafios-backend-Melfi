import { addProductToCart,checkStock,findCartById,findCarts } from "../services/CartServices.js"

export const getCarts = async (req, res) => {
    try {
        const carts = await findCarts()
        res.status(200).send(carts)

    } catch (error) {
        res.status(500).send(error)
    }

}

export const getCartById = async (req, res) => {
    console.log(req.params)
    const {cid}=req.params
    try {
        const cart = await findCartById(cid)
        res.status(200).send(cart)

    } catch (error) {
        res.status(500).send(error)
    }

}


export const addProductCart = async (req, res) => {
    try {
        //idCart,idProduct,quantity
        const {idCart,idProduct,quantity}= req.body
        const cart = await addProductToCart(idCart,idProduct,quantity)
        res.status(200).json({
            message: "Carrito actualizado",
        })

    } catch (error) {
        res.status(500).send(error)
    }

}

export const finalizarCompra = async (req, res) => {
    const {cid}=req.params 
    try {
        const cart = await checkStock(cid)
        res.status(200).json({
            cart_comprado: cart,
        })

    } catch (error) {
        res.status(500).send(error)
    }

}

