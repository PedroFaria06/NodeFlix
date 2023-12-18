const jwt = require("jsonwebtoken")

const createUserToken = async (user, req, res) => {

    //create a token
    const token = jwt.sign({
        name: user.name,
        id: user._id,
        role: user.role,
    },
        "secret")

    //return a token
    res.status(200).json({
        message: "voce esta autenticado",
        token: token,
        userId: user._id,
        role: user.role

    })
}

module.exports = createUserToken 