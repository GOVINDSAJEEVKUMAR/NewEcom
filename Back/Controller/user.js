const express = require("express");
const { upload } = require("../multer");
const router = express.Router();
const User = require("../model/User");
const ErrorHandler = require("../utils/ErrorHandler");
const path = require("path");
const fs = require('fs');
const jwt = require ("jsonwebtoken");
const sendMail = require("../utils/setMail");
const catchAsyncError = require ("../Middleware/catchAsyncError")
const sendToken = require("../utils/jwtToken")



router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;

      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting File" });
        } 
      });
      return next(new ErrorHandler("user Already Exists", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    const user = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
    };
    const activationToken = createActionToken(user);
    const activationUrl =`http//localhost:5173/activation/${activationToken}`
    try{
      await sendMail({
        email:user.email,
        subject:"Activate You Account",
        message:`hello ${user.name},Plz click on the link to activate your account:${activationUrl}`,
      });
      res.status(201).json({
        success:true,
        message:`plz check your mail:${username}to activate account`,
      });

    }catch(err){
      return next (new ErrorHandler(err.message,400));
    }


  } catch (err) {
    return next(new ErrorHandler(err.message, 400));
  }
});

//function crrate activation token

const createActionToken =(user)=>{
  return jwt.sign(user,process.env.ACTIVATION_SECRET,{
    expiresIn:"5m",
  });
}

//activate user

router.post('/activation',catchAsyncError(async(req,res,next)=>{
  try{
    const {activation_token} = req.body;
    const newUSer = jwt.verify(
      process.env.ACTIVATION_SECRET
    );
    if(newUser){
      return next(new ErrorHandler("Invalid ",400));
    }
    const {name,email,password,avatar} = newUser;
    await User.create({name,email,password,avatar});
    sendToken(newUser,201,res);
  }catch(err){
    return next(new ErrorHandler(err.message,500));

  }
}))

router.post('/login-user',catchAsyncError(async(req,res,next)=>{
  try{
    const {email,password} = req.body;
    if(!email || password){
      return next(new ErrorHandler('Plz provide All',400));
    }
    const user = await User.findOne({email}.select("+password"));
    if(!user){
      return next(new ErrorHandler("Not found",400));
    }
    const isPassword = await user.comparePassword(password);

    if(!isPassword)
    return next(new ErrorHandler("Inavalid",400));
  }catch(err){
    return next(new ErrorHandler(err.message,500));
  }
}))

module.exports = router;