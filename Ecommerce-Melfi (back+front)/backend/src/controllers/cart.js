import { addProductCart } from "../services/CartServices.js"

export const addProduct = async (req, res) => {
    try {
        //idCart,idProduct,quantity
        const {idCart,idProduct,quantity}= req.body
        console.log(idCart,idProduct,quantity)
        const cart = await addProductCart(idCart,idProduct,quantity)
        res.status(200).json({
            message: "Carrito actualizado",
        })

    } catch (error) {
        res.status(500).send(error)
    }

}