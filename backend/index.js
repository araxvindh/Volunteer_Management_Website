const express = require("express");
const mdb = require("mongoose"); 
const dotenv = require("dotenv")
const bcrypt =require('bcrypt')
const  cors =require('cors');
const user_sign = require("./models/usersign");
const admin_sign=require("./models/adminsign");
const event_Db=require("./models/adminDb");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3001;


dotenv.config();

mdb
    .connect(process.env.MONGODB_URL)  
    .then(() => {
        console.log("MDB Connection Successful");
    })
    .catch((err) => {
        console.log("Check yout Connection", err);
    });


    app.post("/usersign", async(req, res) => {
        try {
            console.log(req.body);
            const { firstName, lastName, email, password, phoneNumber } = req.body;
            const hashedpass= await bcrypt.hash(password,10);
            const usersign = new user_sign({
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumber,
                password: hashedpass
            });
            usersign.save();
            console.log("SIGNUP SUCCESS");
            res.status(201).json({ message: "SIGNUP DONE", isSignup: true });
        } catch (error) {
            console.log("ERROR", error);
            res.status(201).json({ message: "SIGNUP FAILED", isSignup: false });
        }
    });

    app.post("/userlogin", async(req,res) =>
        {
            try{
                const{email,password}=req.body;
                console.log(req.body);
                const user = await user_sign.findOne({"email":email})
                if(user)
                {   
                    const isValidPassword= await bcrypt.compare(password,user.password);
                    console.log(isValidPassword);
        
                    if(isValidPassword)
                    {
                        res.status(201).json({message:"Login Successful",isLogin:true,user_id:user._id})
                    }
                    else
                    {
                        res.status(201).json({message:"Password inCorrect",isLogin:false})
                    }  
                }
                else
                {
                    res.status(201).json({message:"User not found",isLogin:false})
                }
            }
            catch(error)
            {
                res.status(201).json({message:"Login Unsuccessful",isLogin:false})
            }
        
        })

        app.post("/adminsign", async(req, res) => {
            try {
                console.log(req.body);
                const { firstName, lastName, email, password, phoneNumber } = req.body;
                const hashedpass= await bcrypt.hash(password,10);
                const adminsign = new admin_sign({
                    firstName: firstName,
                    email: email,
                    phoneNumber: phoneNumber,
                    password: hashedpass
                });
                adminsign.save();
                console.log("SIGNUP SUCCESS");
                res.status(201).json({ message: "SIGNUP DONE", isSignup: true });
            } catch (error) {
                console.log("ERROR", error);
                res.status(201).json({ message: "SIGNUP FAILED", isSignup: false });
            }
        });
    
    
        app.post("/adminlogin", async(req,res) =>
            {
                try{
                    const{email,password}=req.body;
                    
                    console.log(req.body);
                    const user = await admin_sign.findOne({"email":email})
                    if(user)
                    {   
                        const isValidPassword= await bcrypt.compare(password,user.password);
                        console.log(isValidPassword);
            
                        if(isValidPassword)
                        {
                            res.status(201).json({message:"Login Successful",isLogin:true,admin_id:user._id})

                        }
                        else
                        {
                            res.status(201).json({message:"Password inCorrect",isLogin:false})
                        }  
                    }
                    else
                    {
                        res.status(201).json({message:"User not found",isLogin:false})
                    }
                }
                catch(error)
                {
                    res.status(201).json({message:"Login Unsuccessful",isLogin:false})
                }
            
            })

    app.post("/admin", async(req,res)=>
    {
        try{
            console.log(req.body);
            const {companyName,location,place,date,volunteer}=req.body;
            const event1 = await new event_Db({
                companyName:companyName,
                location:location,
                place:place,
                date:date,
                volunteer:volunteer,
                hostId:req.body.hostId,
                userId:req.body.userId

            });
            event1.save();
            console.log("EVENT CREATED");
            res.status(201).json({message:"EVENT CREATED",isCreated:true});
        }catch(error)
        {
            console.log("ERROR",error);
            res.status(201).json({message:"EVENT FAILED",isCreated:false});
        }
    })

    app.get("/events", async(req,res)=>
    {
        try{

            const eventDetail =await event_Db.find();

            res.status(201).json(eventDetail);
        }catch(error)
        {
            console.log("ERROR",error);
            res.status(201).json({message:"Not able to fetch  ",isCreated:false});
        }
    }
    )

    app.put("/events/:id/join", async (req, res) => {
    try {
        const { userId } = req.body; 
        const event = await event_Db.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        
        if (event.volunteers.includes(userId)) {
            return res.status(400).json({ message: "User already joined this event" });
        }

        if (event.volunteer > 0) {
            event.volunteer -= 1; // Decrease available volunteer spots
            event.volunteers.push(userId); // Add userId to volunteers array

            await event.save();
            res.json({ message: "User joined successfully", event });
        } else {
            res.status(400).json({ message: "No volunteers needed" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

app.get("/userdetails", async(req,res)=>
{
    try{

        const userDetail =await user_sign.find();

        res.status(201).json(userDetail);
    }catch(error)
    {
        console.log("ERROR",error);
        res.status(201).json({message:"Not able to fetch  ",isCreated:false});
    }
}
)
app.put('/events/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { location, place, volunteer } = req.body;

        const updatedEvent = await event_Db.findByIdAndUpdate(
            id,
            { location, place, volunteer },
            { new: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.json({ message: "Event updated successfully", updatedEvent });
    } catch (error) {
        console.error("Error updating event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
   
app.delete("/events/:id", async (req, res) => {
    try {
        const deletedEvent = await event_Db.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting event", error });
    }
});

app.listen(PORT, () => console.log("Server Started Successfully"));

