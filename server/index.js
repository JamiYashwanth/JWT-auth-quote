const express=require('express')
const app=express()
const cors=require('cors')
const mongoose = require('mongoose')
const User = require('./models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

app.use(express.json())
app.use(cors());

mongoose.connect('mongodb+srv://jami:Kumar200117@cluster0.yvuev.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{ useNewUrlParser : true , useUnifiedTopology: true});

const port = 5000;
app.get('/',(req,res)=>{
    res.send("Hello");
})

app.post('/api/register',async (req,res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser= {
            name : req.body.name,
            email : req.body.email,
            password : hashedPassword
        }
        await User.create(newUser)
        res.json({status: 'ok'})
    }
    catch(err){
        res.json({status: 'error' , error: 'Duplicate email' ,err : `${err}`})
    }
})

app.post('/api/login',async (req,res)=> {
    const search_user = {
        email : req.body.email,
    }
    console.log(search_user);
    const user = await User.findOne(search_user)
    const isPasswordValid = await bcrypt.compare(req.body.password,user.password) 
    if(isPasswordValid){
        const token = jwt.sign({
            name : user.name,
            email : user.email
        }, 'secret123')
        res.json({status : 'ok', user : token})
    }
    else{
        res.json({status : 'error',user : false})
    }
})

app.post('/api/quote',async (req,res) => {
    const token = req.headers['x-access-token']
    try{
        const decoded = jwt.verify(token , 'secret123')
        const user = await User.findOneAndUpdate({email : decoded.email},{quote : req.body.quote})
        res.json({status : 'ok'})
    }
    catch{
        res.json({status : 'error'})
    }
})

app.get('/api/quote',async (req,res) => {
    const token = req.headers['x-access-token']
    try{
        const decoded = jwt.verify(token , 'secret123')
        const user = await User.findOne({email : decoded.email})
        res.json({quote: user.quote})
    }
    catch{
        res.json({status : 'error'})
    }
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

