const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/PlacementPro")

const studentSchema = mongoose.Schema({
    picture: String,
    image: Buffer,
    details:String,
    place:String,
    branch:String,
    batch:Number,
    cgpa:Number, 
    fullname: String,
    email: String,
    password: String,

});

module.exports = mongoose.model("users",studentSchema);