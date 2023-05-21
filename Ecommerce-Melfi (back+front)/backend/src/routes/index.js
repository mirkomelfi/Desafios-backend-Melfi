import routerCart from "./cart.js";
import routerProduct from "./product.js";
import routerSession from "./session.js";
import routerUsers from "./users.js";
import { Router } from "express";

const router = Router()

router.use('/users', routerUsers)
router.use('/auth', routerSession)
router.use('/product', routerProduct)
router.use('/cart', routerCart)

router.use('*', (req, res) => {
    res.status(404).send({ error: "404 No se encuentra la pagina solicitada" })
})

export default router
