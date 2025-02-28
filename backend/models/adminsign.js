const mdb =require ('mongoose')

const   adminSchema=mdb.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    phoneNumber:Number,
})
const admin_sign =mdb.model("adminSign",adminSchema)
module.exports = admin_sign