

const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');



async function userSingIncontroller(req, res) {
  try {
    const { email , password } = req.body

    if(!email){
      throw new Error("please provide email")
    }
    if(!password){
      throw new Error("please provide password")
    }

    const user =await userModel.findOne({email})   // user ko check krenge ki us name ka user phle se hamare database m ha  ya nhi tabhi login kr payenge
    if(!user){
      throw new Error("user not found")
    }
    const checkPassword = await bcrypt.compare(password , user.password)
    // checkPassword agr true hota h toh vo db m match kr rha h  agr false hua toh db m match nhi kr rha h
    console.log("checkpassword" , checkPassword)

    if(checkPassword){
  
      const tokenData ={
        _id : user._id,
        email : user.email,
      }

      
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY , { expiresIn: 60 * 60 * 8 });// jaise hi login successfully ho jyega data token m save ho jyega  

     const tokenOption ={
      httpOnly : true ,
      secure : true
    }
     res.cookie("token" ,token,tokenOption ).json({
      message:"Login successfully",
      data : token ,
      success : true , 
      error : false ,
     })

    }else{
      throw new Error("please check password")
    }


  } catch (err) {
    res.json({
      message : err.message || err  ,
      error : true,
      success : false,
    })
  }
}
module.exports = userSingIncontroller;
