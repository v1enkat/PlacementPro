const express = require('express');
const isloggedin = require('../middlewares/isloggedin');
const multer = require('multer');
const bodyParser = require('body-parser');
const userModel = require('../models/student-model');

const router = express.Router();
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", isloggedin, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  if(!user.domain){
    return res.redirect("/profile/update");
  }
  res.render("profile", { user });
});

router.get("/update", isloggedin, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  res.render("updatedetails", { user });
});

router.post("/upload/:id", upload.single("image"), async (req, res) => {
  try {
    const { Enumber, place, domain, batch } = req.body;
    const userId = req.params.id;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.image = req.file.buffer;
    user.Enumber = Enumber; 
    user.place = place;   
    user.domain = domain; 
    user.batch = batch;

    await user.save();
    res.redirect("/profile");
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ message: "Error uploading image", error });
  }
});

module.exports = router;
