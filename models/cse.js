const { mongoose } = require("mongoose");

const cseSchema = new mongoose.Schema(
  {
    CompanyName: { type: String, required: true, trim: true },
    CompanyCode: { type: String, required: true, trim: true, unique: true },
    Role: { type: String, required: true, trim: true },
    Description: { type: String, trim: true },
    Location: { type: String, trim: true },
    Email: { type: String, trim: true, match: /.+\@.+\..+/ },
    Website: { type: String, trim: true },
    Package: { type: Number, required: true, min: 0 },
    Applied: { type: Number, default: 0, min: 0 },
    LastDate: { type: Date, required: true },
    Status: { type: String, default: "Active", enum: ["Active", "Closed"] },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

module.exports = mongoose.model("CSE", cseSchema);
