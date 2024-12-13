const express = require('express');
const router = express.Router();
const {registerstudent,login,logout} = require("../countrollers/registerstudent")



router.post('/register', registerstudent);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;
