import { createUser, findUserByEmail,findUserById } from "../services/UserServices.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import { createProduct, modifyProduct, removeProduct, findProducts, findProductById,createMockingProducts, findProductByCode} from "../services/ProductServices.js";
import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enums.js";
import { generateProductErrorInfo } from "../services/errors/info.js";


export const addMockingProducts = async (req,res) => {
    //Errores de datos a enviar a mi BDD
    try {
        const mockingproducts = createMockingProducts()
        if (mockingproducts){
            return res.status(200).json({
                message: "Productos añadidos"
            })
        }
        res.status(200).json({
            message: "No se pudieron añadir los productos"
        })
    } catch (error) {
        throw new Error(error)
    }
}


export const addProduct = async (req,res) => {

    const {title,description,code,price,status,stock,category,thumbnails}= req.body
    //Errores de datos a enviar a mi BDD
    try {
        /*
        if (!title||!description||!code||!price||!stock||!category||!thumbnails){
            CustomError.createError({
                name:"Product creation error",
                cause:generateProductErrorInfo ({title,description,code,price,status,stock,category,thumbnails}),
                message:"Error Trying to create Product",
                code:EErrors.INVALID_TYPES_ERROR
            })
        }
        */
        const productBDD = await findProductByCode(code)

        if (productBDD) {
            return res.status(401).send("Producto ya registrado")
        } else {
            const token = req.cookies.jwt;

            jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
                if (err) {
                    return res.status(401).send("Credenciales no válidas")
                } else {
                    const idUser= decodedToken.user.id
                    const userBDD = await findUserById(idUser)
                    // Token valido
                    req.user = userBDD // no se si hace falta
                    const rol=userBDD.rol
                    if (rol==="Premium"){
                        const product={title,description,code,price,status,owner:userBDD.id,stock,category,thumbnails}
                        const newProduct = await createProduct(product)
                    }else{
                        const newProduct = await createProduct(req.body)
                    }

                }
            })
        }

        return res.status(200).json({
            message: "Producto añadido"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


export const updateProduct = async (req, res) => {
    const { id } = req.params
    const product = req.body

    try {
        const newProduct = await modifyProduct(id, product)

        if (newProduct) {
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

    const { id } = req.params
    let rol=""

    if (!id){
        req.logger.warning("No se ingreso un id")
    }

    try {

        jwt.verify(req.cookies.jwt, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                return res.status(401).send("Credenciales no válidas")
            }
            const idUser= decodedToken.user.id
            const userBDD = await findUserById(idUser)
            req.user = userBDD // no se si hace falta
            rol=userBDD.rol
            
            if (rol==="Premium"){
                const product = await findProductById(id)
                const owner= product.owner
                if (owner!==userBDD.id){
                    return res.status(400).json({
                        message: "Usted no tiene el permiso para eliminar este producto"
                    })
                }
            }
                const productRemoved = await removeProduct(id)
                if (productRemoved) {
                    return res.status(200).json({
                        message: "Producto eliminado"
                    })
                }else{
                    res.status(200).json({
                        message: "Producto no encontrado"
                    })
                }
                
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


export const autenticateRolUsr = async (req, res, next) => {
    try {
        
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

    } catch (error) {
        res.status(500).send(`Ocurrio un error en Session, ${error}`)
    }
}


export const autenticateRolAdminPrem = async (req, res, next) => {
    try {
        //El token existe, asi que lo valido
            const token = req.cookies.jwt;

            jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
                if (err) {
                    // Token no valido
                    return res.status(401).send("Credenciales no válidas")
                } else {
                    const idUser= decodedToken.user.id
                    const userBDD = await findUserById(idUser)
                    // Token valido
                    req.user = userBDD
                    const rol=userBDD.rol
                    if (rol==="Admin"||rol==="Premium"){
                        next()
                    }else{
                        return res.status(200).send("Solo Rol Admin y Premium tienen acceso")
                    }

                }
            })

    } catch (error) {
        res.status(500).send(`Ocurrio un error en Session, ${error}`)
    }
}


export const getProducts = async (req, res) => {
    try {
        const products = await findProducts()

        if (products.length!==0){
            res.status(200).send(products) 
        }else{
            res.status(400).send("No hay productos")
        }

    } catch (error) {
        res.status(500).send(error)
    }

}

export const getProductById = async (req, res) => {
    const {id}=req.params
    try {
        const product = await findProductById(id)
        if (product){
            if (!product.title||!product.description||!product.code||!product.price||!product.status||!product.stock||!product.category||!product.thumbnails){
                req.logger.warning(`Faltan propiedades del producto: ${product}`)
            }
            res.status(200).send(product) 
        }else{
            res.status(400).send("Producto no existente")
        }
      

    } catch (error) {
        res.status(500).send(error)
    }

}