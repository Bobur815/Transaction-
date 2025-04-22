import express from "express"
import router from "./src/router/router.js"

let app = express()

app.use(router)

app.listen(4545, () => console.log("Server is running ..."))