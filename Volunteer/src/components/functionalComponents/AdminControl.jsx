import { Link } from "react-router-dom";
import { useState } from "react";
const AdminControl = () => {
    const[showForm,setshowForm]=useState(false);
  return (
    <div>
      <header>
        <nav>
          <button>
            <Link to="/">Logout</Link>
          </button>
        </nav>
      </header>
      <h2>Admin Control</h2>
      <h3>Needed Volunteer for Events</h3>
      <button onClick={(e)=>{setshowForm(true)}}>Hire Volunteer</button>
    {
            showForm&&(<form>
            <table>
              <tr>
                <td>
                  <label htmlFor="Event">Event Name :</label>
                </td>
                <td>
                  <input type="text" placeholder="Events Name" />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="Location">Location :</label>
                </td>
                <td>
                  {" "}
                  <input type="text" placeholder="Location" />{" "}
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="Place">Place</label>
                </td>
                <td>
                  <input type="text" placeholder="Place" />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="date">Date :</label>
                </td>
                <td>
                  <input type="date" placeholder="date"/>
                </td>
              </tr>
                <tr>
                    <td>
                        <label htmlFor="volunteer">Required Volunteers</label>
                    </td>
                    <td><input type="number" placeholder="Number of Volunteer" /></td>
                </tr>
                <tr>
                    <td><input type="checkbox"/> 
                    <label htmlFor="">confirmation of the Event</label></td>
                </tr>
                    <div>
                        <button onClick={(e)=>{setshowForm(false)}}>submit</button>
                    </div>
            </table>
          </form>
            )
    }
    </div>
  );
};

export default AdminControl;
