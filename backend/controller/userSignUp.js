
const userModel = require("../models/userModel")
const bcryptjs = require("bcryptjs")


 async function userSingUpcontroller(req , res){
  try {
    const {email , password , name } = req.body
    // console.log("req.body" , req.body)

    const user =await userModel.findOne({email})
    if(user){
      throw new Error(" already user exist ")
    }
    if(!email){
      throw new Error("please provide email")
    }
    if(!password){
      throw new Error("please provide password")
    }
    if(!name){
      throw new Error("please provide name")
    }
    
    const salt =  bcryptjs.genSaltSync (10);
    const hashpassword = await bcryptjs.hashSync(password , salt);

    if(!hashpassword){
      throw new Error("something is wrong")
    }
    const payload ={
      ...req.body ,
      role : "GENERAL",
      password : hashpassword
    }
    const userData = new userModel(payload)
    const saveUser =await userData.save()

    res.status(201).json({
      data : saveUser,
      success : true,
      error:false,
      message: "User created successfully"
    })

  } catch (err) {
    res.json({
      message : err.message || err  ,
      error : true,
      success : false,
    })
  }
}
module.exports = userSingUpcontroller