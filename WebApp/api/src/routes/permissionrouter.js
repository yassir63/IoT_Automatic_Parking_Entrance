const express = require('express');
const router = express.Router();
const PermissionController = require('../controllers/permissioncontroller');
const Auth = require('../middlewares/auth');


const authMiddleware=new Auth();
const permissionController=new PermissionController()

// router.use(authMiddleware.authentificate)
// router.use(authMiddleware.checkAdmin)

router.get('/',permissionController.getAll)
router.get('/By',permissionController.getBy)
router.get('/:id',permissionController.getById)
router.post('/',permissionController.create)
router.put('/:id',permissionController.update)
router.delete('/:id',permissionController.delete)



module.exports = router;