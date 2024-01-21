const {User} = require('../models');
const BaseController = require('./basecontroller');
const bcrypt = require('bcrypt');
const UserServices = require('../services/userservices');


class UserController extends BaseController {
    constructor() {
        super(User)
    }

    login = async (req, res) => {
      console.log("log");  
      try {
          const { username, password } = req.body;
      
          const user = await UserServices.findByUserName(username)
      
          if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid username or password' });
          }
          const {accessToken, refreshToken} = UserServices.getNewTokens(user)
          res.json({ accessToken, refreshToken});
        } catch (error) {
          res.status(500).json({ error: 'Failed to login.' });
        }
      };

      getNewToken= async (req, res)=>{
        const { refreshToken } = req.body;
        console.log(refreshToken);
        if (!refreshToken) {
            return res.status(401).json({error:'refreshToken required'});
        }
        
        const accessToken = UserServices.getNewToken(refreshToken)
        console.log("acc "+accessToken);
        if(accessToken=="expired") return res.status(403).json({error:'refreshToken expired'});

        return res.json({accessToken})
      }
}

module.exports = UserController;