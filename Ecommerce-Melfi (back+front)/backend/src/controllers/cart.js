import { addProductToCart } from "../services/CartServices.js"

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