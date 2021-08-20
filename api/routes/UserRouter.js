const router= require("express").Router()
const UserCtrl = require("../controller/UserController")
router.get('/get',(req,res)=>{
    res.send('a')
})


router.post('/add',UserCtrl.addUser)
module.exports=router