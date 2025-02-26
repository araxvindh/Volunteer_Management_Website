import { Link } from "react-router-dom";
import "../css/usersign.css";

const UserSignin = () => {
    return (
        <div className="user-signin-container">
            <h1>Sign In</h1>
            <form className="user-signin-form">
                <div className="input-group">
                    <label>First Name</label>
                    <input type="text" placeholder="Enter your first name" required />
                </div>

                <div className="input-group">
                    <label>Last Name</label>
                    <input type="text" placeholder="Enter your last name" required />
                </div>

                <div className="input-group">
                    <label>Date of Birth</label>
                    <input type="date" required />
                </div>

                <div className="input-group">
                    <label>Mobile Number</label>
                    <input type="tel" placeholder="Enter your mobile number" required />
                </div>

                <div className="input-group">
                    <label>Email</label>
                    <input type="email" placeholder="Enter your email" required />
                </div>

                <div className="input-group">
                    <label>Password</label>
                    <input type="password" placeholder="Enter your password" required />
                </div>

                <div className="input-group">
                    <label>Confirm Password</label>
                    <input type="password" placeholder="Confirm your password" required />
                </div>

                <button type="submit" className="signin-button">Sign In</button>

                <p className="login-user">
                    Already have an account? <Link to='/login' className="login-link">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default UserSignin;
