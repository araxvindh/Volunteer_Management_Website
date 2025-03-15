import { Link } from "react-router-dom";
import { useState, useEffect, use } from "react";
import axios from 'axios';

const AdminControl = () => {
    const [showForm, setshowForm] = useState(false);
    const [showData, setshowData] = useState(false);
    const [showuser, setshowuser] = useState(false);
    const [companyName, setName] = useState("");
    const [location, setLocation] = useState("");
    const [place, setPlace] = useState("");
    const [date, setDate] = useState("");
    const [volunteer, setVol] = useState(10);
    const [events, setEvents] = useState([]);
    const  [users,setUsers]=useState([]);

    const handleCreate = async (event) => {
        event.preventDefault();
        const req = await axios.post("http://localhost:3001/admin", {
            companyName: companyName,
            location: location,
            place: place,
            date: date,
            volunteer: volunteer,
            hostId: localStorage.getItem('host_id')
        });
        const message = req.data.message;
        const created = req.data.isCreated;
        if (created) {
            alert("Event created successfully");
            setshowForm(false);
        } else {
            alert("Failed in creating the event");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/events");
                // const user =await axios.get("http://localhost:3001/usersign");
                // setUsers(user.data);
                console.log(response.data);
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/userdetails");
                setUsers(response.data);
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
                    <button onClick={(e) => { localStorage.clear() }}>
                        <Link to="/">Logout</Link>
                    </button>
                </nav>
            </header>
            <h2>Admin Control</h2>
            <h3>Needed Volunteer for Events</h3>
            <button onClick={(e) => { setshowForm(true) }}>Hire Volunteer</button>
            {
                showForm && (
                    <form onSubmit={handleCreate}>
                        <table>
                            <tr>
                                <td>
                                    <label htmlFor="Event">Event Name :</label>
                                </td>
                                <td>
                                    <input type="text" placeholder="Events Name" id="companyName" value={companyName} onChange={(e) => { setName(e.target.value) }} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="Location">Location :</label>
                                </td>
                                <td>
                                    <input type="text" placeholder="Location" id="location" value={location} onChange={(e) => { setLocation(e.target.value) }} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="Place">Place :</label>
                                </td>
                                <td>
                                    <input type="text" placeholder="Place" id="place" value={place} onChange={(e) => { setPlace(e.target.value) }} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="date">Date :</label>
                                </td>
                                <td>
                                    <input type="date" placeholder="date" id="date" value={date} onChange={(e) => { setDate(e.target.value) }} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="volunteer">Required Volunteers</label>
                                </td>
                                <td>
                                    <input type="number" placeholder="Number of Volunteer" id="volunteer" value={volunteer} onChange={(e) => { setVol(e.target.value) }} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" />
                                    <label htmlFor="">Confirmation of the Event</label>
                                </td>
                            </tr>
                            <div>
                                <button type="submit">Submit</button>
                            </div>
                        </table>
                    </form>
                )
            }
            <button onClick={(e) => { setshowData(true) }}>Show my DataBase</button>
            {showData && <form>
                <div>
                    {events.filter(event => (event.hostId) === localStorage.getItem('host_id')).length > 0 ? (
                        events
                            .filter(event => event.hostId == localStorage.getItem('host_id'))
                            .map((event, index) => (
                                <div key={index} style={{ display: "inline-grid", border: "1px solid black", padding: "10px" }}>
                                    <div>
                                        <span>Event Name :</span>
                                        <span>{event.companyName}</span>
                                    </div>
                                    <br />
                                    <div>
                                        <span>Location :</span>
                                        <span>{event.location}</span>
                                    </div>
                                    <br />
                                    <div>
                                        <span>Place :</span>
                                        <span>{event.place}</span>
                                    </div>
                                    <br />
                                    <div>
                                        <span>Date :</span>
                                        <span>{event.date}</span>
                                    </div>
                                    <br />
                                    <div>
                                        <span>No Volunteer Required :</span>
                                        <span>{event.volunteer}</span>
                                    </div>

                                    <div>
                                        <button onClick={(e)=>setshowuser(!showuser)}>the joined Voluunteers</button>
                                        <div>
                                        {users.filter(user => event.volunteers.includes(user._id)).map((user, index) => (
                                            <div key={index} style={{ display: "inline-grid", border: "1px solid black", padding: "10px" }}>
                                                <div>
                                                    <span>First Name:</span>
                                                    <span>{user.firstName}</span>
                                                </div>
                                                <div>
                                                    <span>Last Name:</span>
                                                    <span>{user.lastName}</span>
                                                </div>
                                                <div>
                                                    <span>Email:</span>
                                                    <span>{user.email}</span>
                                                </div>
                                                <div>
                                                    <span>Phone Number:</span>
                                                    <span>{user.phoneNumber}</span>
                                                </div>
                                            </div>
                                        ))}
                                        </div>
                                       
                                      </div>
                                </div>
                            ))
                    ) : (
                        <div>
                            <span style={{ textAlign: "center" }}>No events</span>
                        </div>
                    )}
                </div>
            </form>}
        </div>
    );
};

export default AdminControl;
