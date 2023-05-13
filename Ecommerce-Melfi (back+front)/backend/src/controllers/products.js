import { findProducts, findProductById, createProduct } from "../services/ProductServices.js";
import { createUser, findUserByEmail,findUserById } from "../services/UserServices.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import { validatePassword, createHash } from "../utils/bcrypt.js";

/*
export const getProducts = async (req, res) => {
    try {
        const products = await productManager.getProducts(req.query)
        if (products) {
            return res.status(200).json(products)
        }
        res.status(200).json({
            message: "Productos no encontrados"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getProductById = async (req, res) => {
    const { id } = req.params
    try {
        const product = await productManager.getElementById(id)
        if (product) {
            return res.status(200).json(product)
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


export const addProduct = async (req, res) => {
    const {title,description,code,price,status,stock,category,thumbnails } = req.body
    try {
        const product = await productManager.addElements([{title,description,code,price,status,stock,category,thumbnails}])
        res.status(204).json(product)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
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

export const autenticateRolUsr = async (req, res, next) => {
    try {
        passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        //El token existe, asi que lo valido
            const token = req.cookies.jwt;

            jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
                if (err) {
                    // Token no valido
                    return res.status(401).send("Credenciales no válidas")
                } else {
                    const idUser= decodedToken.user.id
                    const userBDD = await findUserById(idUser)
                    console.log(userBDD)
                    // Token valido
                    req.user = userBDD
                    const rol=userBDD.rol
                    if (rol==="User"){
                        next()
                    }else{
                        return res.status(200).send("Solo Rol usuario tiene acceso")
                    }

                }
            })

        })(req, res, next)
    } catch (error) {
        res.status(500).send(`Ocurrio un error en Session, ${error}`)
    }
}


export const autenticateRolAdmin = async (req, res, next) => {
    try {
        passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        //El token existe, asi que lo valido
            const token = req.cookies.jwt;

            jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
                if (err) {
                    // Token no valido
                    return res.status(401).send("Credenciales no válidas")
                } else {
                    const idUser= decodedToken.user.id
                    const userBDD = await findUserById(idUser)
                    console.log(userBDD)
                    // Token valido
                    req.user = userBDD
                    const rol=userBDD.rol
                    if (rol==="Admin"){
                        next()
                    }else{
                        return res.status(200).send("Solo Rol Admin tiene acceso")
                    }

                }
            })

        })(req, res, next)
    } catch (error) {
        res.status(500).send(`Ocurrio un error en Session, ${error}`)
    }
}


export const getProducts = async (req, res) => {
    try {
        const products = await findProducts()
        res.status(200).send(products)

    } catch (error) {
        res.status(500).send(error)
    }

}

export const getProductById = async (req, res) => {
    try {
        const product = await findProductById()
        res.status(200).send(product)

    } catch (error) {
        res.status(500).send(error)
    }

}