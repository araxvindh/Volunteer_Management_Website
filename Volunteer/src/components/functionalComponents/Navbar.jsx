import { Link } from "react-router-dom"


const Navbar =()=>
{
    return(
           <header>
            <nav>
            <li><Link to='/login'>Login</Link></li>
            </nav>
           </header>
    )
}
export default Navbar