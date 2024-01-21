const {User} = require('../models');
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");

const UserServices= {}
const tokenSecretKey = process.env.TOKENSECRETKEY;

UserServices.findByUserName = async (username) => {
    const user = await User.findOne({
        where: {
            [Op.or]: {
                username: username,
                mail: username
            }
        }
    });
    return user
}

UserServices.getNewTokens = (user) => {
    const accessToken = jwt.sign({ userId: user.id , role: user.role}, tokenSecretKey, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId: user.id , role: user.role }, tokenSecretKey, { expiresIn: '7d' });
    return {accessToken,refreshToken}
}

UserServices.getNewToken = (refreshToken) => {
    var accessToken =""
    jwt.verify(refreshToken, tokenSecretKey, (err, payload) => {
        if (err) {
            accessToken = "expired"
            return
        }
        accessToken = jwt.sign({ userId: payload.userId ,role: payload.role }, tokenSecretKey, { expiresIn: '15m' });
    });
    return accessToken
}


module.exports = UserServices;