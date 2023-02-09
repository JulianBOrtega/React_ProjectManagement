const express = require('express');
const router = express.Router();

const { register, changePassword, checked, login, sendToken, verifyToken } = require('../controllers/authController')

/* /auth */

router
    .post('/register', register)
    .post('/login', login)
    .get('/checked', checked)
    .post('/sendToken', sendToken)
    .route('/changePassword')
        .get(verifyToken)
        .post(changePassword)

module.exports = router;
