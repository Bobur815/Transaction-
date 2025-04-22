import { Router } from "express";
import usercontroller from "../controller/users.js"
import transcontroller from "../controller/transaction.js"
let router = Router()
router
    .get("/transactions/history/:userId",transcontroller.GET_TRANSACTION)
    .post("/transactions/transfer",transcontroller.POST)
    .get("/users/:userId",usercontroller.GET_USERS)
    .put("/users/:userId/limit",usercontroller.PUT)
    .post("users",usercontroller.POST)

export default router