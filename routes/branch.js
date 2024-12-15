const express = require('express');
const civilModel = require("../models/civil");
const bioModel = require("../models/bio");
const chemicalModel = require("../models/chemical");
const cseModel = require("../models/cse");
const eceModel = require("../models/ece");
const mechModel = require("../models/mech");
const eeModel = require("../models/ee");

const router = express.Router();

const branchModels = {    
    Civil: civilModel,
    Bio: bioModel,
    Chemical: chemicalModel,
    CSE: cseModel,
    ECE: eceModel,
    Mechanical: mechModel,
    Electrical:eeModel,
}; // creating array of all models.

router.get('/:id', async (req, res) => {
    try {
        const branch = req.params.id; 

       
        const branchModel = branchModels[branch]; // Getting model for the branch selected.
        if (!branchModel) {
            return res.status(404).send('Branch not found');
        }
        

        
        const cmps = await branchModel.find(); // Taking all companies in that model

       
        res.render('branch', { cmps,branch });
    } catch (error) {
        console.error(error); 
        res.status(500).send('Server Error');
    }
});

module.exports = router;
