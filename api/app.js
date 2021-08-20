require("dotenv").config()
const express=require("express")
const mongoose =require('mongoose')
const cors =require('cors')
const fileUpload = require('express-fileupload')
const coockieParser =require('cookie-parser')

const app=express()
app.use(express.json())
app.use(coockieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))

// ---------------router-------------------

app.use('/api/user',require('./routes/UserRouter'))

const URI=process.env.MONGO_URL
mongoose.connect(URI,{
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
},err=>{
    if(err) throw err;
    console.log('connectc DB')
})
const PORT =process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log('server stated ',PORT)
})
