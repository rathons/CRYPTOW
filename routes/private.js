const express = require("express");
const router = express.Router();
const {protect} = require('../middleware/authenticator');

router.route("/").get(protect);

module.exports = router; 