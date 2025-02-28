const mdb =require ('mongoose')

const  userSchema=mdb.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    phoneNumber:Number
})
const user_sign =mdb.model("userSign",userSchema)
module.exports = user_sign