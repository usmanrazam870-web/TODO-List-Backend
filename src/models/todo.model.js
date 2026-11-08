const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    title:{
        type:String,
        unique:true,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    dueDate:{
        type:Date,
        default:null
    },
    isCompleted:{
        type:Boolean,
        default:false
    }
})
const userModel=mongoose.model("list",userSchema)

module.exports=userModel