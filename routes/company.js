const express = require("express");
const civilModel = require("../models/civil");
const bioModel = require("../models/bio");
const chemicalModel = require("../models/chemical");
const cseModel = require("../models/cse");
const eceModel = require("../models/ece");
const mechModel = require("../models/mech");
const eeModel = require("../models/ee");
const isloggedin = require('../middlewares/isloggedin');
const userModel=require('../models/student-model');
const router = express.Router();

const branchModels = {    
    Civil: civilModel,
    Bio: bioModel,
    Chemical: chemicalModel,
    CSE: cseModel,
    ECE: eceModel,
    Mechanical: mechModel,
    Electrical: eeModel,
};

router.get("/:branch/:id",isloggedin, async (req, res) => {
    const { branch, id } = req.params;

    try {
        // Access the correct model using the branch parameter
        const Model = branchModels[branch];

        if (!Model) {
            return res.status(404).send("Branch Lendu ra ungaa");
        }
        const email=req.user.email;
       const user=await userModel.findOne({email:email});

        const company = await Model.findById(id);

       
        res.render("company", { company, branch,user });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

module.exports = router;
