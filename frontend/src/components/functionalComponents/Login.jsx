
import "../css/login.css"; 
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
const Login = () => {
        const [email,setEmail]=useState("");
        const [password,setPass]=useState("");
        const [email1,setEmail1]=useState("");
        const [password1,setPass1]=useState("");
        const navigate = useNavigate()
        const handleuserLogin = async(event)=>
        {
            event.preventDefault();
            const req= await axios.post("http://localhost:3001/userlogin",
                {
                    email:email,
                    password:password
                });

            const message = req.data.message
            const islogin = req.data.isLogin
            if (islogin) {
             console.log(islogin,message)
                alert(message)
                navigate('/user')
            }
            else {
                console.log(islogin,message)
                alert(message)
                navigate('/user-signup')
            }
        }
        const handleadminLogin = async(event)=>
            {
                event.preventDefault();
                const req= await axios.post("http://localhost:3001/adminlogin",
                    {
                        email:email1,
                        password:password1
                    });
    
                const message = req.data.message
                const islogin = req.data.isLogin
                const host_id = req.data.admin_id
                console.log({host_id})
                if (islogin) {
                 console.log(islogin,message)
                    alert(message)
                    navigate('/admin')
                    localStorage.setItem('host_id',host_id)
                }
                else {
                    console.log(islogin,message)
                    alert(message)
                    navigate('/admin-signup')
                }
            }
    return (
        <div className="login-container">
            <div className="login-box">
                <h3 className="login-title">User Login</h3>
                <form className="login-form"  onSubmit={handleuserLogin}>
                    <div className="login-field">
                        <input className="login-input" type="email" placeholder="Email" required id="email" value={email}  onChange={(e)=>{setEmail(e.target.value)}}/>
                    </div>
                    <div className="login-field">
                        <input className="login-input" type="password" placeholder="Password" required id="password" value={password} onChange={(e)=>{setPass(e.target.value)}}/>
                    </div>
                    <button className="login-button" type="submit">
                                Login
                    </button>
                </form>
            </div>

            <div className="login-box">
                <h3 className="login-title">Host Login</h3>
                <form className="login-form" onSubmit={handleadminLogin}>
                    <div className="login-field">
                        <input className="login-input" type="email" placeholder="Email" required id="email1" value={email1}  onChange={(e)=>{setEmail1(e.target.value)}} />
                    </div>
                    <div className="login-field">
                        <input className="login-input" type="password" placeholder="Password" required id="password1" value={password1} onChange={(e)=>{setPass1(e.target.value)}}/>
                    </div>
                    <button className="login-button" type="submit" >
                                            Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
