const express = require('express');
const router = express.Router();
const UserController = require('../controllers/usercontroller');
const Auth = require('../middlewares/auth');


const authMiddleware=new Auth();
const userController=new UserController()

router.get('/',authMiddleware.authentificate,userController.getAll)
router.get('/By',authMiddleware.authentificate,userController.getBy)
router.get('/:id',authMiddleware.authentificate,userController.getById)
router.post('/',authMiddleware.authentificate,userController.create)
router.put('/:id',userController.update)
router.delete('/:id',authMiddleware.authentificate,userController.delete)

router.post('/login',userController.login)
router.post('/getnewtoken',userController.getNewToken)



module.exports = router;