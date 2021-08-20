const Users = require("../model/UserModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserCtrl = {
    addUser: async (req, res) => {
        try {
            const { name, cmnd, email, sdt, address, password } = req.body;

            const user = await Users.findOne({ email })
            if (user) return res.status(400).json({ msg: 'Email đã tồn tại' })

            if (password.length < 6) return res.status(400).json({ msg: "Password không được nhỏ hơn 6 kí tự" })
            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new Users({
                name, cmnd, email, sdt, address, password: passwordHash
            })
            await newUser.save()
            // res.json({msg : " Thành công"})


            ///crate accesstoken
            // Then create jsonwebtoken to authentication
            const accesstoken = createAccessToken({ id: newUser._id })
            const refreshtoken = createRefreshToken({ id: newUser._id })

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/api/user/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
            })

            res.json({ accesstoken, msg: "thành công" });
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    get: async (req, res) => {
        try {
            const user = await Users.find().select('-password')

            res.json({user})
        } catch (err) {

        }

    }
}
const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '11m' })
}
const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}
module.exports = UserCtrl