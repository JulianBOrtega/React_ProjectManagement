const express = require('express');
const router = express.Router();

const { profile } = require('../controllers/usersController');

/* /users */
router.get('/', profile)

module.exports = router;
