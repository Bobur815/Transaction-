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
    let users = fs.readFileSync(path.join(process.cwd(),"src/db/users.json"));
    console.log(users);
    
    const userId=req.params
    const newLimit=req.body

    if (!users[userId]) {
        return res.status(404).json({status:'404', message:'User not found'})
    }

    if (typeof userId!='number'||newLimit<=0) {
        return res.status(404).json({status:404,message:'Invalid limit value'})
    }

    users[userId].monthlyLimit=newLimit

    res.status(200).json({
        userId,
        newLimit,
        message:'Monthly limit updated successfully!'
    })
}




export default {GET_USERS, POST, PUT}
