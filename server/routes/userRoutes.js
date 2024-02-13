const express = require('express'); // express
const router = express.Router(); // express router
const { registerUser, authUser } = require('../controllers/userControllers'); // user controller


router.route('/').post(registerUser);
router.route('/login').post(authUser);


module.exports = router;


