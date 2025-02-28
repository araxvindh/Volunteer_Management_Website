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
                        res.status(201).json({message:"Login Successful",isLogin:true})
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
                    console.log(user._id);
                    if(user)
                    {   
                        const isValidPassword= await bcrypt.compare(password,user.password);
                        console.log(isValidPassword);
            
                        if(isValidPassword)
                        {
                            res.status(201).json({message:"Login Successful",isLogin:true, host_id:user._id})
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
                //adminId:adminId
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

            const eventDetail=await event_Db.find();

            res.status(201).json(eventDetail);
        }catch(error)
        {
            console.log("ERROR",error);
            res.status(201).json({message:"Not able to fetch  ",isCreated:false});
        }
    }
    )

    app.get("/admins")


app.listen(PORT, () => console.log("Server Started Successfully"));