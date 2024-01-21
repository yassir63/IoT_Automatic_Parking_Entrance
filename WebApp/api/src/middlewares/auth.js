const jwt = require('jsonwebtoken');
const tokenSecretKey = process.env.TOKENSECRETKEY;

class Auth {
    authentificate=async (req, res, next)=>{
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({error:'Unauthorized'});
        }

        const token = authHeader.split(' ')[1];
        jwt.verify(token, tokenSecretKey, (err, payload) => {
            if (err) {
            return res.status(403).json({error:'accessToken expired'});
            }
            req.user={userId: payload.userId ,role: payload.role}
            next();
        });
    }

    checkAdmin=async (req, res, next)=>{
        const role=req.user.role
        if(role=="1"){
            return res.status(401).json({error:'need admin access'});
        }
        next()
    }
}

module.exports = Auth;