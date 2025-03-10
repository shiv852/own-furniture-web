const userModel = require("../models/userModel")

async function userDetailsController(req , res){
  try {
    
    // console.log("user-ki-id-show-hogi" , req.userId)
    const user = await userModel.findById(req.userId)
    
    res.status(200).json({
      data:user,
      error:false,
      success:true,
      message:"All user details aa gyi " //network m jake check kro
    })

  } catch (err) {
    res.status(400).json({
      message: err.message || err , 
      error : true,
      success : false,

    })
  }
}

module.exports = userDetailsController