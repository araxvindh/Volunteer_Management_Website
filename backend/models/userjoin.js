const mdb =require ('mongoose')

const   joinSchema=mdb.Schema({
    user_Id:String
})
const user_join =mdb.model("adminSign",joinSchema)
module.exports = user_join