import { Link } from "react-router-dom";
import "../css/adminsign.css"; 
import Navbar from "./Navbar";
const AdminSignin = () => {
    return (
        <div>
            <Navbar></Navbar>
                     <div className="adminsign-container">
            <div className="adminsign-box">
                <h1 className="adminsign-title">SignUp for the Host </h1>
                <form>
                    <div className="adminsign-field">
                        <label className="adminsign-label">Event Company Name</label>
                        <input className="adminsign-input" type="text" placeholder="Event Company Name" required />
                    </div>

                    <div className="adminsign-field">
                        <label className="adminsign-label">Mobile Number</label>
                        <input className="adminsign-input" type="tel" placeholder="Mobile Number" required />
                    </div>

                    <div className="adminsign-field">
                        <label className="adminsign-label">Email</label>
                        <input className="adminsign-input" type="email" placeholder="Email" required />
                    </div>

                    <div className="adminsign-field">
                        <label className="adminsign-label">Password</label>
                        <input className="adminsign-input" type="password" placeholder="Password" required />
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
