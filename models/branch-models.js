const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    CompanyName: { type: String, required: true },
    CompanyCode: { type: String, required: true },
    Branches: { type: String, required: true }, 
    Role: String,
    Description: String,
    Location: String,
    Email: String,
    Website: String,
    Package: Number,
    criteria:String,
    Applied: Number,
    LastDate: Date,
    Status: { type: String, default: "Active" }
});

module.exports = mongoose.model("Company", companySchema);
