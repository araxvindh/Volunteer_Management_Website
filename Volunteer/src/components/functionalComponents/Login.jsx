import { Link } from "react-router-dom";
import "../css/login.css"; 

const Login = () => {
    return (
        <div className="login-container">
            <div className="login-box">
                <h3 className="login-title">User Login</h3>
                <form className="login-form">
                    <div className="login-field">
                        <input className="login-input" type="email" placeholder="Email" required />
                    </div>
                    <div className="login-field">
                        <input className="login-input" type="password" placeholder="Password" required />
                    </div>
                    <button className="login-button" type="submit">
                        <Link className="login-link" to="/user">Login</Link>
                    </button>
                </form>
            </div>

            <div className="login-box">
                <h3 className="login-title">Admin Login</h3>
                <form className="login-form">
                    <div className="login-field">
                        <input className="login-input" type="email" placeholder="Email" required />
                    </div>
                    <div className="login-field">
                        <input className="login-input" type="password" placeholder="Password" required />
                    </div>
                    <button className="login-button" type="submit">
                        <Link className="login-link" to="/admin">Login</Link>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
