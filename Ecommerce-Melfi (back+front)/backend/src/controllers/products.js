import { findProducts, findProductById, createProduct } from "../services/ProductServices.js";
import { createUser, findUserByEmail } from "../services/UserServices.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import { validatePassword, createHash } from "../utils/bcrypt.js";

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
                    // Token valido
                    req.user = user
                    const rol=req.body.rol
                    if (rol=="User"){
                        return res.status(200).send("OK")
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
                    // Token valido
                    req.user = user
                    const rol=req.body.rol
                    if (rol=="Admin"){
                        return res.status(200).send("OK")
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