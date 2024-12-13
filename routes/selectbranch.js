const express =require('express');
const Company=require("../models/branch-models");
const path=require("path");

const router = express.Router();

router.get("/branch/:dep", async (req, res) => {
  const { dep } = req.params;
  try {
      const cmps = await Company.findAll({
          where: {
              Branches: {
                  [Sequelize.Op.contains]: [dep] 
              }
          }
      });

      return res.render("branch", {
          cmps
      });
  } catch (error) {
      console.error("Error fetching company details:", error);
      return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;