
import fs from "fs"
import path from "path"

let trans = JSON.parse(fs.readFileSync(path.join(process.cwd(),"/src/db/transactions.json"),"utf-8"))
let users = JSON.parse(fs.readFileSync(path.resolve("src","db/users.json")))

// Boburmirzo Ergashev
const GET_TRANSACTION = (req,res) => {
    let {userId} = req.params;
    if(!trans.some(tran => tran.fromUserId == userId)){
        return res.status(404).json({message: `User with ID ${userId} has no transactions`})
    }

    trans = trans.filter(tran => tran.fromUserId == userId);
    res.status(200).send(trans)
}

// Boburmirzo Ergashev
const POST = (req,res) => {
    let {fromUserId,toUserId,amount} = req.body;
    let currentuser = users.find(user => user.userId==fromUserId);
    let transactionId = trans.length? trans.at(-1).transactionId +1 : 1
    let status;
    let timeStamp = getFormattedDate();
    let message;
    let st = 201;

    if(!currentuser || !users.some(user => user.userId == toUserId)) {
        status = "failed";
        message = {
            "status": "failed",
            "message": "User not found."
          };
        st = 404;
    }

    else if(amount > currentuser.balance){
        status = "failed";
        message = {
            "status": "failed",
            "message": "Insufficient balance."
          };
        st = 400
    }
    else if(currentuser.usedLimit +1 > currentuser.monthlyLimit){
        status = "failed";
        message = {
            "status": "failed",
            "message": "Monthly transfer limit exceeded."
          }
        st = 403
    }

    else {

        message = {
            "transactionId": transactionId,
            "status": "success",
            "message": "Transaction completed successfully."
          }
        status = "success"
        currentuser.balance -= amount;
        currentuser.usedLimit +=1;
        let otheruser = users.find(user => user.userId==toUserId);
        otheruser.balance += amount; 
        fs.writeFileSync(path.join(process.cwd(), "/src/db/users.json"), JSON.stringify(users, null, 4));

    }
    let newtrans = {
        transactionId,
        fromUserId,
        toUserId,
        amount,
        status,
        timeStamp,
    }
    trans.push(newtrans)
    fs.writeFileSync(path.join(process.cwd(),"/src/db/transactions.json"),JSON.stringify(trans,null,4))
    return res.status(st).json(message);
}

function getFormattedDate() {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); 
    const year = now.getFullYear();

    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export default {GET_TRANSACTION, POST}
