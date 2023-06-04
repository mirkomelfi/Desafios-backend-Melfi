import { Router } from "express";
import { createNewPassword, loginUser, passwordRecovery, registerUser } from "../controllers/session.js";

const routerSession = Router()

routerSession.post("/register", registerUser)
routerSession.post("/login", loginUser)
routerSession.post("/passwordRecovery", passwordRecovery)
routerSession.post("/newPass", createNewPassword)


export default routerSession