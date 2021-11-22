const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type: String,
        required : true
    },
    email :{
        type: String,
        unique:true,
        required : true
    },
    password:{
        type:String,
        required : true
    },
    quote:{
        type : String,
        default : 'No Quote'
    }
    },{
        collection: 'user-data'
    }
)

const User = mongoose.model('User', userSchema)

module.exports = User