const express = require('express');
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const authRouter= express.Router();
const crypto = require("crypto")

authRouter.post("/register" ,async (req,res)=>{
    const {name, email, password} = req.body

    const isUserAlreadyExist = await userModel.findOne({email})

    if(isUserAlreadyExist){
        return res.status(409).json({
            message:"User already exists with this email"
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex")

   const user = await userModel.create({
        name,email,password:hash
    })

    const token = jwt.sign({
        id: user._id,
        email: user.email
    },
    process.env.JWT_SECERT,{expiresIn:"1h"})

    res.cookie("jwt_token", token)

    res.status(201).json({
        message:"User registered successfully",
        user,
        token
    })
})

authRouter.get("/get-me",async (req, res)=>{
    const token = req.cookies.jwt_token

  const decoded = jwt.verify(token, process.env.JWT_SECERT)
  
  const user = await userModel.findById(decoded.id)
  res.json({
    user: user.name,
    email: user.email
  })
})

authRouter.post("/protected", (req, res)=>{
    console.log(req.cookies);
})

authRouter.post("/login", async (req,res)=>{

    const {email, password} = req.body

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(404).json({
            message:"User not found with this email"
        })
    } 

    const isPasswordMatch = user.password === crypto.createHash("md5").update(password).digest("hex")
    if(!isPasswordMatch){
        return res.status(401).json({
            message:"Invalid password"
        })
    }    
    const token = jwt.sign({
        id: user._id,
    },process.env.JWT_SECERT, {expiresIn:"1h"})

    res.cookie("jwt_token", token)

    res.status(200).json({
        message:"User logged in successfully",
        user,
    })
})

module.exports = authRouter;