const router= require("express").Router()
const UserCtrl = require("../controller/UserController")
const auth = require("../middlware/auth")
router.get('/get',UserCtrl.get)

router.post('/add',UserCtrl.addUser)


router.get('/refresh_token',UserCtrl.refreshToken)

router.post('/login',UserCtrl.login)

router.get('/get_user',auth,UserCtrl.getUser)

module.exports=router