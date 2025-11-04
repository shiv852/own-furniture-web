const mongoose = require("mongoose")


async function connecteDb(){
  try{
    mongoose.connect(`${process.env.MONGODB_URL}/furniture`)
    console.log("connected to the database")
  }catch(err){
    console.log(err)
  }

}

module.exports = connecteDb
