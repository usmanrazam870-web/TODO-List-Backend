const express=require('express')
const authRouter=require('./routes/auth.route')
const todoRouter=require('./routes/todo.route')
const cookieParser=require('cookie-parser')
const app=express()
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRouter)
app.use('/api/todo',todoRouter)



module.exports=app