
const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    profile_picture:String,
    name:String,
    bio:String,
    phone:Number,
    email:String,
    password:String
});

const UserModel = mongoose.model("users",userSchema);

module.exports={UserModel}
