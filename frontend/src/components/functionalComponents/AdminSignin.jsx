import { Link ,useNavigate} from "react-router-dom";
import "../css/adminsign.css"; 
import Navbar from "./Navbar";
import {useState} from 'react';
import axios from 'axios'
const AdminSignin = () => {
        const [firstName,setFName]=useState("");
        const [email,setEmail]=useState("");
        const [password,setPass]=useState("");
        const [phoneNumber,setPhoneno]=useState(0);
        const navigate = useNavigate()
        const handleadminSign =async(event)=>
        {
                event.preventDefault();
                const req = await axios.post("http://localhost:3001/adminsign",{

                    firstName:firstName,
                    email:email,
                    password:password,
                    phoneNumber:phoneNumber
                });
            const message = req.data.message
            const isSignup = req.data.isSignup
            if (isSignup) {
             console.log(isSignup,message)
                alert(message)
                navigate('/login')
            }
            else {
                console.log(isSignup,message)
                alert(message)
            }
        }
    return (
        <div>
            <Navbar></Navbar>
                     <div className="adminsign-container">
            <div className="adminsign-box">
                <h1 className="adminsign-title">SignUp for the Host </h1>
                <form onSubmit={handleadminSign}>
                    <div className="adminsign-field">
                        <label className="adminsign-label">Event Company Name</label>
                        <input className="adminsign-input" type="text" placeholder="Event Company Name" required id="firstName" value={firstName} onChange={(e)=>{setFName(e.target.value)}} />
                    </div>

                    <div className="adminsign-field">
                        <label className="adminsign-label">Mobile Number</label>
                        <input className="adminsign-input" type="tel" placeholder="Mobile Number" required id="phoneNumber" value={phoneNumber} onChange={(e)=>{setPhoneno(e.target.value)}}/>
                    </div>

                    <div className="adminsign-field">
                        <label className="adminsign-label">Email</label>
                        <input className="adminsign-input" type="email" placeholder="Email" required id="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    </div>

                    <div className="adminsign-field">
                        <label className="adminsign-label">Password</label>
                        <input className="adminsign-input" type="password" placeholder="Password" required id="password" value={password} onChange={(e)=>{setPass(e.target.value)}} />
                    </div>

                    <div className="adminsign-field">
                        <label className="adminsign-label">Confirm Password</label>
                        <input className="adminsign-input" type="password" placeholder="Confirm Password" required />
                    </div>

                    <button className="adminsign-button" type="submit">
                        SignUp
                    </button>

                    <div className="adminsign-text">
                        <h3>
                            Already have an account? <Link className="adminsign-link" to="/login">Login</Link>
                        </h3>
                    </div>
                </form>
            </div>
        </div>
        </div>

       
    );
};

export default AdminSignin;
