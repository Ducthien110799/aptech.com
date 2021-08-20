const Users = require("../model/UserModel")

const UserCtrl = {
    addUser: async (req, res) => {
        try {
            const { name, cmnd, email, sdt, address, password } = req.body;

            const user = await Users.findOne({ email })
            if(user) return res.status(400).json({msg : 'Email đã tồn tại'})
            const newUser = new Users({
                name, cmnd, email, sdt, address, password
            })
           await newUser.save()
          // res.json({msg : " Thành công"})
          console.log("thành công");
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}
module.exports = UserCtrl