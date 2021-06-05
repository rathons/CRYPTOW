const express = require('express')
const router = express.Router();

const {register, signin, forgotPassword, resetPassword} = require('../controllers/auth');

router.route("/register").post(register) 
router.route("/signin").post(signin) 
router.route("/forgotpass").post(forgotPassword) 
router.route("/resetpass/:resetToken").put(resetPassword) 


module.exports = router;