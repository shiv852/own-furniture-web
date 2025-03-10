
const jwt = require("jsonwebtoken")
// jwt token used to decrypt this password

async function authToken(req , res , next){
  try {

    // jo token browser ki history m save h uske yha layenge id email
    const token = req.cookies?.token 

    if(!token){
      return res.status(200).json({
        message : "user not login",
        error: true,
        sucess : false ,
      })
    }

    console.log(token)
    jwt.verify(token, process.env.TOKEN_SECRET_KEY,function(err , decoded){
      console.log(err)
      console.log("decoded" , decoded)

      if(err){
       console.log("error with" , err)
      }

      req.userId = decoded?._id
      next()
    })


  } catch (err) {
    res.status(400).json({
      message : err.message || err ,
      data : [],
      error : true,
      success : false ,
    })
    
  }
}


module.exports = authToken