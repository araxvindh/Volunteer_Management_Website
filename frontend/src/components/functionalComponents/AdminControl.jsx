import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const AdminControl = () => {
    const [showForm, setshowForm] = useState(false);
    const [showData, setshowData] = useState(false);
    const [showuser, setshowuser] = useState(false);
    const [editMode, setEditMode] = useState(null); // Stores event ID for editing
    const [companyName, setName] = useState("");
    const [location, setLocation] = useState("");
    const [place, setPlace] = useState("");
    const [date, setDate] = useState("");
    const [volunteer, setVol] = useState(10);
    const [events, setEvents] = useState([]);
    const [users, setUsers] = useState([]);

    // Fetch events
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/events");
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchData();
    }, []);

    // Fetch users
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/userdetails");
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchData();
    }, []);

    // Create event
    const handleCreate = async (event) => {
        event.preventDefault();
        try {
            const req = await axios.post("http://localhost:3001/admin", {
                companyName,
                location,
                place,
                date,
                volunteer,
                hostId: localStorage.getItem("host_id"),
            });
            if (req.data.isCreated) {
                alert("Event created successfully");
                setshowForm(false);
                setEvents([...events, req.data.event]);
            } else {
                alert("Failed to create the event");
            }
        } catch (error) {
            console.error("Error creating event:", error);
        }
    };

    // Delete event
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/events/${id}`);
            setEvents(events.filter(event => event._id !== id));
            alert("Event deleted successfully");
        } catch (error) {
            console.error("Error deleting event:", error);
            alert("Failed to delete the event");
        }
    };

    // Enable edit mode
    const enableEdit = (event) => {
        setEditMode(event._id);
        setLocation(event.location);
        setPlace(event.place);
        setVol(event.volunteer);
    };

    // Update event
    const handleUpdate = async (id) => {
        try {
            const updatedEvent = { location, place, volunteer };
            await axios.put(`http://localhost:3001/events/${id}`, updatedEvent);
            setEvents(events.map(event => (event._id === id ? { ...event, ...updatedEvent } : event)));
            setEditMode(null);
            alert("Event updated successfully");
        } catch (error) {
            console.error("Error updating event:", error);
            alert("Failed to update the event");
        }
    };

    return (
        <div>
            <header>
                <nav>
                    <button onClick={() => localStorage.clear()}>
                        <Link to="/">Logout</Link>
                    </button>
                </nav>
            </header>

            <h2>Admin Control</h2>
            <h3>Needed Volunteer for Events</h3>
            <button onClick={() => setshowForm(true)}>Hire Volunteer</button>

            {showForm && (
                <form onSubmit={handleCreate}>
                    <table>
                        <tr>
                            <td><label htmlFor="Event">Event Name :</label></td>
                            <td><input type="text" placeholder="Event Name" value={companyName} onChange={(e) => setName(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="Location">Location :</label></td>
                            <td><input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="Place">Place :</label></td>
                            <td><input type="text" placeholder="Place" value={place} onChange={(e) => setPlace(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="date">Date :</label></td>
                            <td><input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="volunteer">Required Volunteers:</label></td>
                            <td><input type="number" value={volunteer} onChange={(e) => setVol(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" /><label>Confirm Event</label></td>
                        </tr>
                        <button type="submit">Submit</button>
                    </table>
                </form>
            )}

            <button onClick={() => setshowData(true)}>Show my Database</button>

            {showData && (
                <div>
                    {events.filter(event => event.hostId === localStorage.getItem("host_id")).length > 0 ? (
                        events
                            .filter(event => event.hostId === localStorage.getItem("host_id"))
                            .map((event, index) => (
                                <div key={index} style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
                                    <div><span>Event Name:</span> <span>{event.companyName}</span></div>
                                    <div><span>Location:</span> <span>{event.location}</span></div>
                                    <div><span>Place:</span> <span>{event.place}</span></div>
                                    <div><span>Date:</span> <span>{event.date}</span></div>
                                    <div><span>No of Volunteers:</span> <span>{event.volunteer}</span></div>

                                    <button onClick={() => setshowuser(!showuser)}>Joined Volunteers</button>

                                    {showuser && (
                                        <div>
                                            {users.filter(user => event.volunteers.includes(user._id)).map((user, index) => (
                                                <div key={index} style={{ border: "1px solid black", padding: "10px" }}>
                                                    <div><span>First Name:</span> <span>{user.firstName}</span></div>
                                                    <div><span>Last Name:</span> <span>{user.lastName}</span></div>
                                                    <div><span>Email:</span> <span>{user.email}</span></div>
                                                    <div><span>Phone Number:</span> <span>{user.phoneNumber}</span></div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {editMode === event._id ? (
                                        <div>
                                            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                                            <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} />
                                            <input type="number" value={volunteer} onChange={(e) => setVol(e.target.value)} />
                                            <button onClick={() => handleUpdate(event._id)}>Save</button>
                                            <button onClick={() => setEditMode(null)}>Cancel</button>
                                        </div>
                                    ) : (
                                        <div>
                                            <button onClick={() => enableEdit(event)}>Edit</button>
                                            <button onClick={() => handleDelete(event._id)}>Delete</button>
                                        </div>
                                    )}
                                </div>
                            ))
                    ) : (
                        <span>No events</span>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminControl;
