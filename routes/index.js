const express =require('express');
const isloggedin = require('../middlewares/isloggedin');

const router = express.Router();

router.get("/",(req,res)=>{
    
    res.render("home")
});
module.exports = router;