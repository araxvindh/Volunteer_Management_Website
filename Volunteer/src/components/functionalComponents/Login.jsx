import { Link } from "react-router-dom";
import "../css/login.css"; 

const Login = () => {
    return (
        <div className="login-container">
            <div className="login-box">
                <h3 className="login-title">User Login</h3>
                <form className="login-form">
                    <div className="input-group">
                        <input type="email" placeholder="Email" />
                    </div>
                    <div className="input-group">
                        <input type="password" placeholder="Password" />
                    </div>
                    <button type="submit" className="login-button">
                        <Link to="/user" style={{ color: "white", textDecoration: "none" }}>Login</Link>
                    </button>
                </form>
            </div>

            <div className="separator"></div>

            <div className="login-box">
                <h3 className="login-title">Admin Login</h3>
                <form className="login-form">
                    <div className="input-group">
                        <input type="email" placeholder="Email" />
                    </div>
                    <div className="input-group">
                        <input type="password" placeholder="Password" />
                    </div>
                    <button type="submit" className="login-button">
                        <Link to="/admin" style={{ color: "white", textDecoration: "none" }}>Login</Link>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
