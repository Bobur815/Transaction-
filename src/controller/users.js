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
    try {
        let users = JSON.parse(fs.readFileSync(path.resolve("src","db/users.json")));
        let {balance,monthlyLimit} = req.body;
        if(!balance || balance < 1 || isNaN(+balance)){
            throw new Error("Invalid Balance!");
        }
        else if(!monthlyLimit || monthlyLimit < 1 || isNaN(+monthlyLimit)){
            throw new Error("Invalid monthlyLimit!");
        }
        let id = users.length ? parseInt(users.at(-1).userId) + 1 : 1;

        let obj = {
            'userId': String(id),
            balance,
            monthlyLimit,
            "usedLimit" : 0 
        }
        users.push(obj);
        fs.writeFileSync(path.resolve("src","db/users.json"),JSON.stringify(users,null,4))
        res.status(201).send("Seccessfully!");
    } catch (error) {
        res.status(400).send(error.message)
    }

    
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
