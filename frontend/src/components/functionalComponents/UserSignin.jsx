import { Link } from "react-router-dom";
import "../css/usersign.css";
import Navbar from "./Navbar";

const UserSignin = () => {
    return (
        <div>
        <Navbar></Navbar>
        <div className="usersign-container">
            <div className="usersign-box">
                <h1 className="usersign-title">Sign In</h1>
                <form>
                    <div className="usersign-field">
                        <label className="usersign-label">First Name</label>
                        <input className="usersign-input" type="text" placeholder="Enter your first name" required />
                    </div>

                    <div className="usersign-field">
                        <label className="usersign-label">Last Name</label>
                        <input className="usersign-input" type="text" placeholder="Enter your last name" required />
                    </div>

                    <div className="usersign-field">
                        <label className="usersign-label">Date of Birth</label>
                        <input className="usersign-input" type="date" required />
                    </div>

                    <div className="usersign-field">
                        <label className="usersign-label">Mobile Number</label>
                        <input className="usersign-input" type="tel" placeholder="Enter your mobile number" required />
                    </div>

                    <div className="usersign-field">
                        <label className="usersign-label">Email</label>
                        <input className="usersign-input" type="email" placeholder="Enter your email" required />
                    </div>

                    <div className="usersign-field">
                        <label className="usersign-label">Password</label>
                        <input className="usersign-input" type="password" placeholder="Enter your password" required />
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
