import { Link } from "react-router-dom";
import "../css/navbar.css"
const Navbar = () => {
    return (
        <header className="nav-head">
            <nav className="nav-div">
                <ul>
                    <button className="nav-but"><li><Link to='/login'>Login</Link></li></button>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
