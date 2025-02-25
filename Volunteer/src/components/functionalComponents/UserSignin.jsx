import { Link } from "react-router-dom";



const UserSignin =() =>
{
    return(
        <div>
        <div>
            <h1>Sign In</h1>
            <form>
                <input type="text" placeholder="First Name" />
                <br />
                <input type="text" placeholder="Last Name" />
                <br />
                <input type="date" placeholder="Date of Birth" />
                <br />
                <input type="tel" placeholder="Mobile Number" />
                <br />
                <input type="email" placeholder="Email" />
                <br />
                <input type="password" placeholder="Password" />
                <br />
                <input type="password" placeholder="Confirm Password" />
                <br />
                <button type="submit">Sign In</button>
                <br />
                <div>

                <h3>Already have an account?<Link to='/login'>Login</Link> </h3>
                </div>
            </form>
        </div>
    </div>
    )
}

export default UserSignin;