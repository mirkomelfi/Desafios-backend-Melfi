import { createUser, findUserByEmail, isTokenExpired, modifyUser } from "../services/UserServices.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer'
import { validatePassword, createHash } from "../utils/bcrypt.js";
import { createCart } from "../services/CartServices.js";
import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enums.js";
import { generateUserErrorInfo } from "../services/errors/info.js";

export const loginUser = async (req, res, next) => {
    try {
        passport.authenticate('jwt', { session: false }, async (err, user, info) => {
            if (err) {
                return res.status(401).send("Error en consulta de token")
            }

            if (!user) {
                //El token no existe, entonces consulto por el usuario
                const { email, password } = req.body
                const userBDD = await findUserByEmail(email)

                if (!userBDD) {
                    // UserBDD no encontrado en mi aplicacion
                    return res.status(401).send("User no encontrado")
                }

                if (!validatePassword(password, userBDD.password)) {
                    // Contraseña no es válida
                    return res.status(401).send("Contraseña no valida")
                }

                // Ya que el usuario es valido, genero un nuevo token
                const token = jwt.sign({ user: { id: userBDD._id } }, process.env.JWT_SECRET)
                res.cookie('jwt', token, { httpOnly: true })
                return res.status(200).json({ token })
            } else {
                //El token existe, asi que lo valido
                const token = req.cookies.jwt;
                jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
                    if (err) {
                        // Token no valido
                        return res.status(401).send("Credenciales no válidas")
                    } else {
                        // Token valido
                        req.user = user
                        return res.status(200).send("Creedenciales validas")

                    }
                })
            }

        })(req, res, next)
    } catch (error) {
        res.status(500).send(`Ocurrio un error en Session, ${error}`)
    }
}

export const passwordRecovery= async (req,res) => {   // en cada ruta a la que ingreso debo checkear las credenciales ??? sino no tengo como acceder al user desde aqui??
    try {

        const { email } = req.body

        let transporter = nodemailer.createTransport({ //Genero la forma de enviar info desde mail (o sea, desde Gmail con x cuenta)
            host: 'smtp.gmail.com', //Defino que voy a utilizar un servicio de Gmail
            port: 465,
            secure: true,
            tls: {
                rejectUnauthorized: false
            },
            auth: {
                user: "mirkomelfi123@gmail.com", //Mail del que se envia informacion
                pass: "qpeokphyvruqpkrz",
                authMethod: 'LOGIN'
            }
        
        })

        let url= "http://localhost:4000/auth/newPass"

        await transporter.sendMail({
            from: 'Test Coder mirkomelfi123@gmail.com',
            to: email,
            subject: "Mail de recuperacion de contraseña",
            html: `
                <div>
                    <h2> ${url} </h2>
                </div>
            `,
            attachments: []
        })
        res.cookie("cookie cookie","cookie password",{maxAge:60*60*1000,signed:true})
        res.send("Email enviado")
        
    } catch (error) {
        throw new Error(error)
    }
}

export const createNewPassword= async (req,res) => { 
    try {
        const { email, password } = req.body // ingresa su mail y su nueva contra 
        const userBDD= await findUserByEmail(email)
        if (userBDD){
            const passwordCookie=req.signedCookies
            if (!isTokenExpired(passwordCookie)){ // esta mal el parametro, no se que pasarle
                if (validatePassword(password, userBDD.password)) {
                    return res.status(400).send("No puedes colocar la misma contraseña")
                }else{
                    const hashPassword = createHash(password)
                    const userId= userBDD.id
                    await modifyUser(userId,hashPassword)
                    return res.status(200).send("Contraseña restablecida correctamente")
                }
            }else{
                res.status(400).send("Token expiro") // en realidad hay que hacer un redirect
            }
        }else{
            res.status(400).send("No tienes cuenta creada con este email")
        }


    } catch (error) {
        throw new Error(error)
    }
}

export const registerUser = async (req, res) => {
    try {
        const { first_name, last_name, rol, email, age, password } = req.body
        
        /*
        CustomError.createError({
            name:"User creation error",
            cause:generateUserErrorInfo ({first_name, last_name, rol, email, age, password}),
            message:"Error Trying to create User",
            code:EErrors.INVALID_TYPES_ERROR
        })
        */

        const userBDD = await findUserByEmail(email)

        if (userBDD) {
            res.status(401).send("Usuario ya registrado")
        } else {
            const hashPassword = createHash(password)

            if (rol!=="Admin"){
                const newCart= await createCart({products:[]})
                const idCartUser=newCart.id
                const newUser = await createUser({ first_name, last_name, rol, email, age, password: hashPassword, idCart:idCartUser})
            }

            const newUser = await createUser({ first_name, last_name, rol, email, age, password: hashPassword})

            const token = jwt.sign({ user: { id: newUser._id } }, process.env.JWT_SECRET);
            res.cookie('jwt', token, { httpOnly: true });
            res.status(201).json({ token });
        }


    } catch (error) {
        res.status(500).send(`Ocurrio un error en Registro User, ${error}`)
    }

}