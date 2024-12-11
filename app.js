const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path")
require("dotenv").config();
const app = express();


//requiring all the model's-->
const studentModel = require(path.join(__dirname, "models", "student-model"));

// requiring all the routes's-->
const indexRouter = require(path.join(__dirname, "routes", "index"));
const studentRouter = require(path.join(__dirname, "routes", "studentrouter"))



app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")))
app.set("view engine","ejs");
app.set('views', path.join(__dirname, 'views'));



//using routes-->
app.use("/index",indexRouter);
app.use("/student",studentRouter);




mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));


app.get("/", (req, res) => res.send("Running!"));

 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
