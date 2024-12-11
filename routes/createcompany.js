const express = require("express");
const router = express.Router();
const CompanyModel = require("../models/branch-models");

router.get("/",async (req,res)=>{
      res.render("createcompany")
});

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

       
        if (Branches.length === 0) {
            return res.status(400).json({ message: "Branches must be a non-empty array." });
        }

        const newCompany = new CompanyModel({
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
        });

        const savedCompany = await newCompany.save();

        res.status(201).json({
            message: "Company added successfully",
            data: savedCompany,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating company",
            error: error.message,
        });
    }
});

module.exports = router;
