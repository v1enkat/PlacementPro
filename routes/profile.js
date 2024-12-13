
const express =require('express');

const router = express.Router();

router.get("/",(req,res)=>{
    
  const {fullname,branch,email} =req.user;

    res.render("profile",{
      UserName:fullname,
      Branch:branch,
      Email:email,
      Profile:"/images/profile.png"
    });
});
module.exports = router;