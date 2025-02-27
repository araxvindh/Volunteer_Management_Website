import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import "../css/home.css"
const Home = () => {
    return (
        <div className="home-div1">
            <Navbar />
            <table className="home-table">
                <tr>
                    <td>
                        <h1 className="home-h1">
                            New User click here to Join the Event As Volunteer <br />
                        </h1>
                        <h1 className="home-h1"><Link to='/user-signup'>SignUp for Users</Link></h1>
                    </td>
                        
                    <td>
                        <h1 className="home-h1">
                            New Event Coordinator Click here to Hire a Volunteer <br />
                        </h1> 
                        <h1 className="home-h1"><Link to='/admin-signup'>SignUp for Event Hosts</Link></h1>
                    </td>
                </tr>

                <tr>
                    <td>
                        <h2 className="home-h2">As a Volunteer start making your own money</h2>
                    </td>
                    <td>
                        <h2 className="home-h2">Easy to find your teammates to host your event successfully</h2>
                    </td>
                </tr>
            </table>
        </div>
    );
};

export default Home;
