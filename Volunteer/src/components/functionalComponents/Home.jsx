import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import "../css/home.css"
const Home = () => {
    return (
        <div className="home-container">
            <Navbar />
            <table className="home-table">
                <tr className="home-row">
                    <td className="home-cell">
                        <h1 className="home-title">
                            New User click here to Join the Event As Volunteer <br />
                        </h1>
                        <h1><Link to='/user-signup' className="home-link">SignUp for Users</Link></h1>
                    </td>
                        
                    <td className="home-cell">
                        <h1 className="home-title">
                            New Event Coordinator Click here to Hire a Volunteer <br />
                        </h1> 
                        <h1><Link to='/admin-signup' className="home-link">SignUp for Event Hosts</Link></h1>
                    </td>
                </tr>

                <tr className="home-row">
                    <td className="home-cell">
                        <h2 className="home-subtitle">As a Volunteer start making your own money</h2>
                    </td>
                    <td className="home-cell">
                        <h2 className="home-subtitle">Easy to find your teammates to host your event successfully</h2>
                    </td>
                </tr>
            </table>
        </div>
    );
};

export default Home;
