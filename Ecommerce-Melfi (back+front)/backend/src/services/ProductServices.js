import productModel from "../models/MongoDB/productModel.js";
import {faker} from "@faker-js/faker"

export const findProducts = async () => {
    try {
        const products = await productModel.find()
        return products
    } catch (error) {
        throw new Error(error)
    }
}

const createRandomProducts = () => {
    return{
        productId: faker.database.mongodbObjectId(),
        title:faker.commerce.productName(),
        description:faker.commerce.productDescription(),
        price:faker.commerce.price(),
        stock:faker.number.int({min:10,max:100,precision:1}),
        status:true,
        code:faker.string.uuid(),
        category:1,
        thumbnails:[]
    }
}

export const createMockingProducts = async () => {

    try {
        const products=[]
        for (let i=0;i<100;i++){
            products.push(createRandomProducts())
        }

        const productsBDD= await productModel.insertMany(products)
        
        return productsBDD
    } catch (error) {
        throw new Error(error)
    }

}


/*
export const findProducts = async (params) => {

    try {
        let {limit,page,sort,category}=params
        if (category){
            if (sort==="1"||sort==="-1"){
                return await productModel.paginate({category},{sort:{price:parseInt(sort)},limit:limit||10,page:page||1})
            }else{
                return await productModel.paginate({category},{limit:limit||10,page:page||1})
            }
        }else{
            if (sort==="1"||sort==="-1"){
                return await productModel.paginate({},{sort:{price:parseInt(sort)},limit:limit||10,page:page||1})
            }else{
                return await productModel.paginate({},{limit:limit||10,page:page||1})
            }
        }
    } catch (error) {
        throw new Error(error)
    }
}
*/

export const findProductById = async (id) => {
    try {
        const product = await productModel.findById(id)
        return product
    } catch (error) {
        throw new Error(error)
    }
}


export const createProduct = async (product) => {
    //Errores de datos a enviar a mi BDD
    try {
        const newproduct = await productModel(product)
        await newproduct.save()
        return newproduct
    } catch (error) {
        throw new Error(error)
    }
}


export const modifyProduct = async (idProduct, product) => {
    const id  = idProduct
    const { title,description,code,price,status,stock,category,thumbnails } = product
    try {
        const product = await productModel.findByIdAndUpdate(id, {title,description,code,price,status,stock,category,thumbnails})

        if (product) {
            return product
        }

        return -1

    } catch (error) {
        throw new Error(error)
    }

}


export const removeProduct = async (idProduct) => {
    try {
        const product = await productModel.findByIdAndDelete(idProduct)
        if (product) {
            return product
        }
        return -1
    } catch (error) {
        throw new Error(error)
    }
}
