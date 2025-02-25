
import { Link } from "react-router-dom";


const Login =() =>
{
    return(
        <div>
            <table>
                <tr>
                    <td>
                        <h3> User Login</h3>
                <form>
                <input type="email" placeholder="Email" />
                <br />
                <input type="password" placeholder="Password" />
                <br />
                <button type="submit"><Link to='/user'>Login</Link></button>
                <br />
                </form>
                    </td>

                    <td>
                        <h3>Admin Login</h3>
                <form>
                <input type="email" placeholder="Email" />
                <br />
                <input type="password" placeholder="Password" />
                <br />
                <button type="submit"><Link to='/admin'>Login</Link></button>
                <br />
                </form>
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default Login;