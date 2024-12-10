const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const studentModel = require("./models/student-model");
const app = express();

app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));


app.get("/", (req, res) => res.send("Running!"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
