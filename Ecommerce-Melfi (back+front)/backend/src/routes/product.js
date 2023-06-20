import { Router } from "express";
import { autenticateRolAdminPrem, autenticateRolUsr, deleteProduct, updateProduct, addProduct, getProducts, getProductById,addMockingProducts} from "../controllers/products.js";
import { addProductCart } from "../controllers/cart.js";


const routerProduct = Router()

routerProduct.get("/", getProducts)
routerProduct.get("/:id", getProductById)

routerProduct.post("/add", autenticateRolUsr, addProductCart)

routerProduct.post("/mockingproducts", addMockingProducts)

routerProduct.post("/create", autenticateRolAdminPrem, addProduct) //OK
routerProduct.put("/:id", autenticateRolAdminPrem, updateProduct)
routerProduct.delete("/:id", autenticateRolAdminPrem, deleteProduct)



export default routerProduct