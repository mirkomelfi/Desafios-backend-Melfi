import userModel from "../models/MongoDB/userModel.js";

export const findUsers = async () => {

    try {
        const users = await userModel.find()
        return users
    } catch (error) {
        throw new Error(error)
    }
}

export const findUserById = async (id) => {
    try {
        const user = await userModel.findById(id)
        return user
    } catch (error) {
        throw new Error(error)
    }
}

export const findUserByEmail = async (email) => {
    try {
        const user = await userModel.findOne({ email: email })
        return user
    } catch (error) {
        throw new Error(error)
    }
}


export const createUser = async (user) => {
    //Errores de datos a enviar a mi BDD
    try {
        const newUser = await userModel(user)
        await newUser.save()
        return newUser
    } catch (error) {
        throw new Error(error)
    }
}


export const modifyUser = async (id, password) => {
    try {
        const user = await userModel.findByIdAndUpdate(id, {password})
        return user

    } catch (error) {
        throw new Error(error)
    }

}


export const isTokenExpired = (passwordData) => {
    try {
        const elapsedTime = Date.now()-passwordData.timeStamp
        const expirationTime= 60*60*1000
        return elapsedTime>=expirationTime
    } catch (error) {
        throw new Error(error)
    }
}