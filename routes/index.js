var express = require('express');
var router = express.Router();
const indexControllers = require('../controllers/indexControllers');
const uploadImage = require('../middlewares/multer');


router.get('/', indexControllers.viewHome);
router.get('/oneRestaurant/:id', indexControllers.viewOneRestaurant);

router.get('/register', indexControllers.viewRegister);
router.post('/register', uploadImage("restaurant"), indexControllers.register);

router.get('/editRestaurant/:id', indexControllers.showEditRestaurant);
router.post('/editRestaurant/:id',  uploadImage("restaurant"), indexControllers.editRestaurant);

router.get('/notDelete/:id', indexControllers.notDelete);

router.get('/aboutus', indexControllers.viewAbout);

router.get('/login', indexControllers.viewLogin);
router.post('/login', indexControllers.login);

module.exports = router;

