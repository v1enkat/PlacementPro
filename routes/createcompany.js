const express = require("express");
const router = express.Router();
const civilModel = require("../models/civil");
const bioModel = require("../models/bio");
const chemicalModel = require("../models/chemical");
const cseModel = require("../models/cse");
const eceModel = require("../models/ece");
const mechModel = require("../models/mech");

// Map branch names to their respective models
const branchModelMap = {
    CIVIL: civilModel,
    BIO: bioModel,
    CHEMICAL: chemicalModel,
    CSE: cseModel,
    ECE: eceModel,
    MECH: mechModel,
}; // creating all the models as array.



// Helper function to get models based on branches
const getModelsForBranches = (branches) => {
    return branches
        .map((branch) => branchModelMap[branch.toUpperCase().trim()])
        .filter((model) => model); // Filter out invalid branches
};

// Render form (if necessary)
router.get("/", (req, res) => {
    res.render("createcompany");
});

// Handle form submission
router.post("/", async (req, res) => {
    try {
        const {
            CompanyName,
            CompanyCode,
            Branches,
            Role,
            Description,
            Location,
            Email,
            Website,
            Package,
            Applied,
            LastDate,
            Status,
        } = req.body;

        // Parse branches and find respective models
        const branchList = Array.isArray(Branches) ? Branches : Branches.split(",").map((b) => b.trim());
        const models = getModelsForBranches(branchList); // getting models for all the branches in the string.

        if (models.length === 0) {
            return res.status(400).json({ message: "Invalid branches specified" });
        }

        // Save company details to each branch model
        const results = [];
        for (const model of models) {
            const newCompany = new model({
                CompanyName,
                CompanyCode,
                Branches: branchList, // Save all branches for reference
                Role,
                Description,
                Location,
                Email,
                Website,
                Package,
                Applied,
                LastDate,
                Status,
            });
            const savedCompany = await newCompany.save(); 
            results.push(savedCompany);
        }

        res.status(201).json({
            message: "Company added successfully to all specified branches",
            data: results,
        });
    } catch (error) {
        console.error("Error creating company:", error);
        res.status(500).json({
            message: "Error creating company",
            error: error.message,
        });
    }
});

module.exports = router;
