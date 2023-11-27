var express = require('express');
var router = express.Router();
const dishControllers = require('../controllers/dishControllers');
const uploadImage = require('../middlewares/multer');

router.get('/', dishControllers.viewDishes);

router.get('/addDish/:id', dishControllers.showAddDish);
router.post('/addDish/:id', uploadImage("food"), dishControllers.addDish);

router.get('/editDish/:id', dishControllers.showEditDish);
router.post('/editDish/:restaurant_id/:id',  uploadImage("food"), dishControllers.editDish); 

router.get('/deleteDish/:restaurant_id/:id', dishControllers.deleteDish);

module.exports = router;