const express = require('express');
const router = express.Router();
const VehicleController = require('../controllers/vehiclecontroller');
const Auth = require('../middlewares/auth');


const authMiddleware=new Auth();
const vehicleController=new VehicleController()

// router.use(authMiddleware.authentificate)
// router.use(authMiddleware.checkAdmin)

router.get('/',vehicleController.getAll)
router.get('/By',vehicleController.getBy)
router.get('/:id',vehicleController.getById)
router.post('/',vehicleController.create)
router.put('/:id',vehicleController.update)
router.delete('/:id',vehicleController.delete)



module.exports = router;