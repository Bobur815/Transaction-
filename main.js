import express, { Router } from "express"
import router from "./src/router/router.js"

let app = express()
app.use(express.json())
app.use(router)

app.listen(4545, () => console.log("Server is running ..."))