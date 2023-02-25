const express=require("express");
const { UserModel } = require("../Models/User.model");
const authRouter=express.Router();
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

authRouter.get("/register",async(req,res)=>{
 res.send("welcome to Auth")
})

authRouter.post("/register",async(req,res)=>{
    console.log(req.body)
  let { email, password, name, profile_picture, phone, bio } = req.body;

  const isUserPresent = await UserModel.findOne({email});

  if(isUserPresent?.email){
            res.send("Please try to Login first, User Already Exist")
  }else{
    try {
        bcrypt.hash(password,3, async function(err,hash){
            const user= new UserModel({email,password:hash,name, profile_picture, phone, bio})
            await user.save();
            res.send("Congratulations, SignUp Successfull");
        })
    } catch (error) {
        console.log(error);
        res.send("Something went wrong, Please try again later");
    }
  }

});

authRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
       const isUserRegisrered = await UserModel.find({email})
    
       if(isUserRegisrered.length>0){
           const hashed_pass = isUserRegisrered[0].password;
           bcrypt.compare(password,hashed_pass,function(err,result){
               if(result){
                   const token=jwt.sign({"userID":isUserRegisrered[0]._id},process.env.KEY)
                   res.send({"message":"Log In Successfull","Token":token})
               }else{
                   res.send("Log-In Failed. Please Enter Correct Password");
               }
           })
       }else{
           res.send("Log-In Failed. Please Sign Up.")
       }
   } catch (error) {
        console.log(error);
       res.send("Something went wrong, Please try again later");
    }
});


module.exports={authRouter}