const mongoose=require('mongoose')

const UserSchema= new mongoose.Schema({
    name : {

        type: String,
        required: true
    },
    cmnd:{
        type: String,
        required: true
    },
    email :{
        type: String,
        required: true
    },
    sdt:{
        type: String,
       
    },
    address: {
        type: String,
      
    },
    role : {
        type: String
    },
    password : {
        type: String,
        
    }
},{
    timestamps: true
})

module.exports=mongoose.model('user',UserSchema)