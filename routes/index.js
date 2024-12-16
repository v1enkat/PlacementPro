const express =require('express');
const isloggedin = require('../middlewares/isloggedin');
const userModel=require('../models/student-model');

const router = express.Router();

router.get("/",isloggedin,async(req,res)=>{
    const email=req.user.email;
    const user=await userModel.findOne({email:email});

    res.render("home",{user})
});
module.exports = router;