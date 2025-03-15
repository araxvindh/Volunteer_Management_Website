const mdb =require('mongoose')

const event=mdb.Schema(
    {
        companyName:String,
        location:String,
        place:String,
        date:String,
        volunteer:Number,
        hostId:String,
        volunteers: [{ type: mdb.Schema.Types.ObjectId, ref: "User" }]
    }
)

const event_Db=mdb.model("adminDb",event)
module.exports=event_Db


