const express = require('express');
const civilModel = require("../models/civil");
const bioModel = require("../models/bio");
const chemicalModel = require("../models/chemical");
const cseModel = require("../models/cse");
const eceModel = require("../models/ece");
const mechModel = require("../models/mech");

const router = express.Router();

const branchModels = {
    civil: civilModel,
    bio: bioModel,
    chemical: chemicalModel,
    cse: cseModel,
    ece: eceModel,
    mech: mechModel,
}; // creating array of all models.

router.get('/:id', async (req, res) => {
    try {
        const branch = req.params.id; 

       
        const branchModel = branchModels[branch]; // Getting model for the branch selected.
        if (!branchModel) {
            return res.status(404).send('Branch not found');
        }
        

       
        const cmps = await branchModel.find(); // Taking all companies in that model

       
        res.render('branch', { cmps });
    } catch (error) {
        console.error(error); 
        res.status(500).send('Server Error');
    }
});

module.exports = router;
