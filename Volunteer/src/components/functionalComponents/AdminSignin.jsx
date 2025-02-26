import { Link } from "react-router-dom";
import "../css/adminsign.css"; 

const AdminSignin = () => {
    return (
        <div className="admin-signin-container">
            <h1>Sign In</h1>
            <form className="admin-signin-form">
                <div className="input-group">
                    <label>Event Company Name</label>
                    <input type="text" placeholder="Event Company Name" />
                </div>

                <div className="input-group">
                    <label>Mobile Number</label>
                    <input type="tel" placeholder="Mobile Number" />
                </div>

                <div className="input-group">
                    <label>Email</label>
                    <input type="email" placeholder="Email" />
                </div>

                <div className="input-group">
                    <label>Password</label>
                    <input type="password" placeholder="Password" />
                </div>

                <div className="input-group">
                    <label>Confirm Password</label>
                    <input type="password" placeholder="Confirm Password" />
                </div>

                <button type="submit" className="signup-button">
                    SignUp
                </button>

                <div className="login-user">
                    <h3>
                        Already have an account? <Link to="/login">Login</Link>
                    </h3>
                </div>
            </form>
        </div>
    );
};

export default AdminSignin;
