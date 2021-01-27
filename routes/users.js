const express = require('express');
const router = express.Router();
const { body } = require('express-validator'); 




const userCotroller = require('../controllers/passengerController/userCtrl')

app
router.post('/register',[
    body('name').trim().isLength({min: 6}),
    body('phone').trim().isLength({min: 9, max: 14}),
    body('password').isLength({min: 6}),
], userCotroller.register)


router.post('/login',[
    body('phone').trim().isLength({min: 9, max: 14}),
    body('password').isLength({min: 6}),
], userCotroller.login)




module.exports = router;