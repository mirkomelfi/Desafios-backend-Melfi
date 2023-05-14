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
        const [cartFinal,cartCancelado] = await checkStock(cid)
        if (cartFinal.length!==0){
            if (cartCancelado.length!==0){
                res.status(200).json({
                    message: "Carrito comprado, pero algunos productos no contaban con stock",
                    cartComprado: cartFinal,
                    cartSinStock:cartCancelado
                })
            }else{
                res.status(200).json({
                    message: "Carrito comprado",
                    cartComprado: cartFinal
                })
            }
        }else{
            res.status(200).json({
                message: "No se pudo realizar la compra, chequee el stock",
            })
        }

    } catch (error) {
        res.status(500).send(error)
    }

}

