import { Router } from "express";

const routerSocket=Router()

routerSocket.get("/",(req,res)=>{
    res.render("realTimeProducts",{})
})

export default routerSocket