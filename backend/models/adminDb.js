const mdb =require('mongoose')

const event=mdb.Schema(
    {
        companyName:String,
        location:String,
        place:String,
        date:String,
        volunteer:Number,
        hostId:String
    }
)

const event_Db=mdb.model("adminDb",event)
module.exports=event_Db