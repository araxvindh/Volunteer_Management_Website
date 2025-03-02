import { Link ,useNavigate} from "react-router-dom";
import "../css/usersign.css";
import Navbar from "./Navbar";
import {useState} from 'react';
import axios from 'axios'


const UserSignin = () => 
{

        const [firstName,setFName]=useState("");
        const [lastName,setLName]=useState("");
        const [email,setEmail]=useState("");
        const [password,setPass]=useState("");
        const [phoneNumber,setPhoneno]=useState(0);
        const navigate = useNavigate()
        const handleuserSign =async(event)=>
        {
                event.preventDefault();
                const req = await axios.post("http://localhost:3001/usersign",{

                    firstName:firstName,
                    lastName:lastName,
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
        <div className="usersign-container">
            <div className="usersign-box">
                <h1 className="usersign-title">Sign In</h1>
                <form onSubmit={handleuserSign}>
                    <div className="usersign-field">
                        <label className="usersign-label">First Name</label>
                        <input className="usersign-input" type="text" placeholder="Enter your first name" required id="firstName" value={firstName} onChange={e=>setFName(e.target.value)}/>
                    </div>

                    <div className="usersign-field">
                        <label className="usersign-label">Last Name</label>
                        <input className="usersign-input" type="text" placeholder="Enter your last name" required id="lastName" value={lastName} onChange={e=>setLName(e.target.value)} />
                    </div>

                    <div className="usersign-field">
                        <label className="usersign-label">Date of Birth</label>
                        <input className="usersign-input" type="date" required />
                    </div>

                    <div className="usersign-field">
                        <label className="usersign-label">Mobile Number</label>
                        <input className="usersign-input" type="tel" placeholder="Enter your mobile number" required  id="phoneNumber" value={phoneNumber} onChange={e=>setPhoneno(e.target.value)}/>
                    </div>

                    <div className="usersign-field">
                        <label className="usersign-label">Email</label>
                        <input className="usersign-input" type="email" placeholder="Enter your email" required id="email" value={email} onChange={e=>setEmail(e.target.value)}/>
                    </div>

                    <div className="usersign-field">
                        <label className="usersign-label">Password</label>
                        <input className="usersign-input" type="password" placeholder="Enter your password" required id="password" value={password} onChange={e=>setPass(e.target.value)}/>
                    </div>

                    <div className="usersign-field">
                        <label className="usersign-label">Confirm Password</label>
                        <input className="usersign-input" type="password" placeholder="Confirm your password" required />
                    </div>

                    <button className="usersign-button" type="submit">Sign In</button>

                    <p className="usersign-text">
                        Already have an account? <Link className="usersign-link" to='/login'>Login</Link>
                    </p>
                </form>
            </div>
        </div>
        </div>
    );
};

export default UserSignin;
