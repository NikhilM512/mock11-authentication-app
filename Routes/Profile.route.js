const express = require("express");
const { UserModel } = require("../Models/User.model");

const profileRouter=express.Router();

profileRouter.get("/",async(req,res)=>{
        const userID = req.body.userID
        console.log(userID)
        const user = await UserModel.findOne({_id:userID});
        res.send(user);
});

profileRouter.patch("/update", async (req, res) => {
    const userID = req.body.userID
    const payload=req.body
    console.log(userID,payload)
    try {
        await UserModel.findByIdAndUpdate({_id : userID},payload)
        res.send({"msg" : "Profile updated successfully"})
    } catch (error) {
        console.log(error)
        res.send(error)
    }
       
});

module.exports={profileRouter}