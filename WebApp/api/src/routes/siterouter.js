const express = require('express');
const router = express.Router();
const SiteController = require('../controllers/sitecontroller');
const Auth = require('../middlewares/auth');


const authMiddleware=new Auth();
const siteController=new SiteController()

// router.use(authMiddleware.authentificate)
// router.use(authMiddleware.checkAdmin)

router.get('/',siteController.getAll)
router.get('/By',siteController.getBy)
router.get('/:id',siteController.getById)
router.post('/',siteController.create)
router.put('/:id',siteController.update)
router.delete('/:id',siteController.delete)



module.exports = router;