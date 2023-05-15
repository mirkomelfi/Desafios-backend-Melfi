import { Router } from "express";
import { autenticateRolAdmin, autenticateRolUsr, deleteProduct, updateProduct, addProduct, getProducts, getProductById} from "../controllers/products.js";
import { addProductCart } from "../controllers/cart.js";


const routerProduct = Router()

routerProduct.get("/", getProducts)
routerProduct.get("/:id", getProductById)

routerProduct.post("/add", autenticateRolUsr, addProductCart)

routerProduct.post("/mockingproducts", )

routerProduct.post("/create", autenticateRolAdmin, addProduct)
routerProduct.put("/:id", autenticateRolAdmin, updateProduct)
routerProduct.delete("/:id", autenticateRolAdmin, deleteProduct)



export default routerProduct