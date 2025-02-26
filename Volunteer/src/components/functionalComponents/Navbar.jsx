import { Link } from "react-router-dom";
import "../css/navbar.css"
const Navbar = () => {
    return (
        <header className="navbar">
            <nav>
                <ul>
                    <li><Link to='/login' className="login-link">Login</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
