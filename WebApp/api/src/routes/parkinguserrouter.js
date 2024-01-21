const express = require('express');
const router = express.Router();
const ParkingUserController = require('../controllers/parkingUsercontroller');
const Auth = require('../middlewares/auth');


const authMiddleware=new Auth();
const parkingUserController=new ParkingUserController()

// router.use(authMiddleware.authentificate)
// router.use(authMiddleware.checkAdmin)

router.get('/',parkingUserController.getAll)
router.get('/By',parkingUserController.getBy)
router.get('/fetchUserData',parkingUserController.getUserData)
router.get('/:id',parkingUserController.getById)
router.post('/',parkingUserController.create)
router.put('/:id',parkingUserController.update)
router.delete('/:id',parkingUserController.delete)



module.exports = router;