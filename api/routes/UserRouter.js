const router= require("express").Router()
const UserCtrl = require("../controller/UserController")

router.get('/get',UserCtrl.get)

router.post('/add',UserCtrl.addUser)

module.exports=router