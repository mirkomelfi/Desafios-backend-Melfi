import { addProductCart } from "../services/CartServices.js"

export const addProduct = async (req, res) => {
    try {
        //idCart,idProduct,quantity
        const {idCart,idProduct,quantity}= req.body
        const product = await addProductCart(idCart,idProduct,quantity)
        res.status(200).send(product)

    } catch (error) {
        res.status(500).send(error)
    }

}