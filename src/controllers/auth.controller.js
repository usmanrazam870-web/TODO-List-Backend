const userModel=require('../models/user.model')
const jwt=require('jsonwebtoken')
const bcryptjs=require('bcryptjs')
async function userRegister(req,res){
    const {username,email,password}=req.body
    const identify=await userModel.findOne({
        $or:[
            {username},{email}
        ]
    })
    if(identify){
        return res.status(409).json({
            message:"User already exists"
        })
    }
    const secure=await bcryptjs.hash(password,10)
    const user=await userModel.create({
        username,email,password:secure
    })
    const token=jwt.sign({
        user:user._id
    },process.env.JWT_PRIVATE_KEY)
    res.cookie("token",token)
    
    res.status(201).json({
        message:"User Registered Successfully",
        user,
        token
    })

}
async function loginUser(req,res){
    const {username,email,password}=req.body
    const identify=await userModel.findOne({
        $or:[
            {username},{email}
        ]
    })
    
    if(!identify){
        return res.status(401).json({
            message:"User not Found"
        })
    }
    const checkPassword=await bcrypt.compare(req.body.password,identify.password)
    if (!checkPassword) {
        return res.status(401).json({
            message: "Invalid Password"
        });
    }
    const token=req.cookies.token
    if(!token)
    {
        return res.status(401).json({
            message:"Unauthorize"
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_PRIVATE_KEY)
    }
    catch(err){
        return res.status(401).json({
            message:"unauthorize"
        })
    }
    
    
    
    res.status(200).json({
        message:"Logged in Successfully"
    })
}
module.exports={userRegister,loginUser}