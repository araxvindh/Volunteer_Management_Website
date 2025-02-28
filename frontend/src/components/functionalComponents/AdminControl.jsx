import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios'
const AdminControl = () => {
    const[showForm,setshowForm]=useState(false);
    const[showData,setshowData]=useState(false);
    const[companyName,setName]=useState("");
    const[location,setLocation]=useState("");
    const[place,setPlace]=useState("");
    const[date,setDate]=useState("");
    const[volunteer,setVol]=useState(10);
    const [events, setEvents] = useState([]);
    const handleCreate =async(event)=>
      {
              event.preventDefault();
              const req = await axios.post("http://localhost:3001/admin",{
                companyName: companyName,
                location: location,
                place: place,
                date: date,
                volunteer: volunteer
              });
              const message=req.data.message;
              const created=req.data.isCreated;
              if(created)
              {
                alert("Event created successfully");
                setshowForm(false);
              }
              else
              {
                alert("Failed in creating the event")
              }
      }
      useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/events");
                    console.log(response.data);
                    setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchData();
    }, []);

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
            showForm&&(<form onSubmit={handleCreate}>
            <table>
              <tr>
                <td>
                  <label htmlFor="Event">Event Name :</label>
                </td>
                <td>
                  <input type="text" placeholder="Events Name" id="companyName" value={companyName} onChange={(e)=>{setName(e.target.value)}}/>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="Location">Location :</label>
                </td>
                <td>
                  <input type="text" placeholder="Location" id="location" value={location} onChange={(e)=>{setLocation(e.target.value)}}/>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="Place">Place :</label>
                </td>
                <td>
                  <input type="text" placeholder="Place" id="place" value={place} onChange={(e)=>{setPlace(e.target.value)}}/>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="date">Date :</label>
                </td>
                <td>
                  <input type="date" placeholder="date" id="date" value={date} onChange={(e)=>{setDate(e.target.value)}}/>
                </td>
              </tr>
                <tr>
                    <td>
                        <label htmlFor="volunteer">Required Volunteers</label>
                    </td>
                    <td><input type="number" placeholder="Number of Volunteer" id="volunteer" value={volunteer} onChange={(e)=>{setVol(e.target.value)}} /></td>
                </tr>
                <tr>
                    <td><input type="checkbox"/> 
                    <label htmlFor="">confirmation of the Event</label></td>
                </tr>
                    <div>
                        <button type="submit">submit</button>
                    </div>
            </table>
          </form>
            )
    }

    <button onClick={(e)=>{setshowData(true)}}>Show my DataBase</button>
      {showData &&<form>
        <div>
          {events.map((event, index) => (
            <div key={index} style={{ display: "grid-inline", border: "1px solid black", padding: "10px" }}>
              <tr>
                <th>Event Name :</th>
                <td>{event.companyName}</td>
              </tr>
              <br />
              <tr>
                <th>Location :</th>
                <td>{event.location}</td>
              </tr>
              <br />
              <tr>
                <th>Place :</th>
                <td>{event.place}</td>
              </tr>
              <br />
              <tr>
                <th>Date :</th>
                <td>{event.date}</td>
              </tr>
              <br />
              <tr>
                <th>No Volunteer Required :</th>
                <td>{event.volunteer}</td>
              </tr>
            </div>
          ))}
        </div>
      </form>}
    </div>
  );
};

export default AdminControl;
