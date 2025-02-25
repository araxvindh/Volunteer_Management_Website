import Navbar from "./Navbar";
import { Link } from "react-router-dom";
const Home = () =>
{
    return(
        <div>
            <Navbar></Navbar>

            <table border={0}>
                <tr>
                    <td><h1>New User click here to Join the Event As Voolunteer <br /><Link to='/user-signup'>SignUp for Users</Link>
                        </h1></td>
                    <td>
                        <h1>New Event Cooordinator Click here to Hire a Voolunteer
                            <br />
                            <Link to='/admin-signup'>SignUp for Event Hosts</Link>
                            </h1> 
                    </td>
                </tr>
            </table>
            
        </div>
    )
}

export default Home;