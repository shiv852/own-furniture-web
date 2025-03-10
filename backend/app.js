
const express = require("express")
const app = express()
const cors = require("cors")
const connecteDb = require('./config/db')
const router = require("./routes/index")
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/authRouter')
require("dotenv").config()


  app.use(cors({
    // hamare token save ho jyega cookie m jake
    origin: process.env.FRONTEND_URL,
    credentials:true
  }))
  // hamara data jo user k pass se arha h vo json format m bdl jyega yha aate hi
  app.use(express.json())
  app.use(cookieParser())
  app.use("/api" , router)
  app.use('/auth',authRouter)

// app.get("/" ,function(req , res){
//   res.send("hey")
// })

const PORT = process.env.PORT || 3000 


connecteDb().then(()=>{
  app.listen(PORT,()=>{
    console.log("connect to DB")
    console.log("server is running")
  })
})