const { mongoose } = require("mongoose");

const bioSchema=new mongoose.Schema({
      CompanyName:{ type: String, required:true},
      CompanyCode:{ type: String, required:true},
      Role:String,
      Description:String,
      Location:String,
      Email:String,
      Website:String,
      Package:Number,
      Applied:Number,
      LastDate:Date,
      Status:{type: String, default:"Active"}
});

module.exports=mongoose.model("bio",bioSchema);
