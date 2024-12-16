const mongoose = require("mongoose");



const studentSchema = mongoose.Schema({
    picture: String,
    image: Buffer,
    branch:String,
    batch:Number,
    cgpa:Number, 
    fullname: String,
    email: String,
    Enumber:String,
    password: String,
    place:String,
    domain:String

});

module.exports = mongoose.model("users",studentSchema); // users is the model .