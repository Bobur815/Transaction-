import fs from "fs"
import path from "path"

let trans = JSON.parse(fs.readFileSync(path.join(process.cwd(),"/src/db/transactions.json"),"utf-8"))

const GET_TRANSACTION = (req,res) => {
    
}
const POST = (req,res) => {
    let newtrans = req.body;
    newtrans = {
        id: trans.length ? trans.at(-1).id +1 : 1,
        ...newtrans
    }

    trans.push(newtrans)
    fs.writeFileSync(path.join(process.cwd(),"/src/db/transactions.json"),JSON.stringify(trans,null,4))
    res.status(201).json({"transactionId": `${newtrans.id}`, "status": "success", "message": "Transaction completed successfully."})
}

export default {GET_TRANSACTION, POST}