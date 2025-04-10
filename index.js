const express =require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./models/User')
const Productroutes = require('./routes/Productroutes')

const server = express()
server.use(cors())
server.use(bodyParser.json())
server.use('/product',Productroutes)


try{
    mongoose.connect('mongodb+srv://varadabidkar:Varada%40123@cluster0.mvynfo0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>console.log('Database Connected'))
.catch((err)=>console.log(err))
}
catch(err){
    console.error(err)
}


server.post('/register',async(req,res)=>{
    try{
        const {fullName,userName,age,password} = req.body
        const userExist = await User.findOne({userName})
        if(userExist){
            return res.json({status:false,message:"User already exist"})
        }
        const user = new User({fullName,userName,age,password})
        user.save()
        res.json({
            status:true,
            message:'User added successfully'
        })
    }
    catch(err){
        res.json({
            status:false,
            message:`${err}`
        })
    }
})

server.post('/login',async(req,res)=>{
    try{
        const {userName,password}=req.body
        const userExist=await User.findOne({userName})
         if(!userExist){
            return res.json({
                status:false,
                message:"User not found"
            })
         }
         if(password!==userExist.password){
            return res.json({
                status:false,
                message:"Wrong password"
            })
         }

         res.json({
            status:true,
            message:"Login successful"
         })

    }catch(err){
        res.json({
            status:false,
            message:err
        })
    }
})


 

server.listen(9022,()=>{
    console.log('Server started listening at port 9022')
})
