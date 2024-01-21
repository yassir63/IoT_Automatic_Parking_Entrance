const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employeecontroller');
const Auth = require('../middlewares/auth');


const authMiddleware=new Auth();
const employeeController=new EmployeeController()

// router.use(authMiddleware.authentificate)
// router.use(authMiddleware.checkAdmin)

router.get('/',employeeController.getAll)
router.get('/By',employeeController.getBy)
router.get('/:id',employeeController.getById)
router.post('/',employeeController.create)
router.put('/:id',employeeController.update)
router.delete('/:id',employeeController.delete)



module.exports = router;