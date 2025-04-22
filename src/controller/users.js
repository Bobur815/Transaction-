import fs from "fs"
import path from "path"

const GET_USERS = (req,res) => {
        let users = JSON.parse(fs.readFileSync(path.resolve("src","db/users.json")))
        let userId = req.params.userId;
        if(!users.some(user => user.userId == userId)){
            res.status(404).send("NOT FOUND!")
            return
        }
        
        let user = users.filter(user => parseInt(user.userId) == userId);
        res.status(200).send({
            "userId": user[0].userId,
            "balanse": user[0].balance 
        });
    
}

const POST = (req,res) => {
    
}
const PUT = (req,res) => {
    
}


export default {GET_USERS, POST, PUT}