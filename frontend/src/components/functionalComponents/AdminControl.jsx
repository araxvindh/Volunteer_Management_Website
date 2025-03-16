import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import '../css/adminControl.css';

const AdminControl = () => {
    const [showForm, setShowForm] = useState(false);
    const [showData, setShowData] = useState(false);
    const [showUser, setShowUser] = useState(false);
    const [editMode, setEditMode] = useState(null);
    const [companyName, setName] = useState("");
    const [location, setLocation] = useState("");
    const [place, setPlace] = useState("");
    const [date, setDate] = useState("");
    const [volunteer, setVol] = useState(10);
    const [events, setEvents] = useState([]);
    const [users, setUsers] = useState([]);

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
                setShowForm(false);
                setEvents([...events, req.data.event]);
            } else {
                alert("Failed to create the event");
            }
        } catch (error) {
            console.error("Error creating event:", error);
        }
    };

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
        <div className="admin-control-container">
            <header className="admin-header">
                <nav className="admin-nav">
                    <button onClick={() => localStorage.clear()} className="logout-button">
                        <Link to="/" className="logout-link">Logout</Link>
                    </button>
                </nav>
            </header>

            <h2 className="admin-title">Admin DashBoard</h2>
            {/* <h3 className="volunteer-heading">Needed Volunteer for Events</h3> */}
            <button onClick={() => setShowForm(true)} className="create-event-button">Add Event Details</button>

            {showForm && (
                <form onSubmit={handleCreate} className="event-form">
                    <table className="event-table">
                        <tbody>
                            <tr>
                                <td><label htmlFor="Event" className="label">Event Name :</label></td>
                                <td><input type="text" className="input-field" placeholder="Event Name" value={companyName} onChange={(e) => setName(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="Location" className="label">Location :</label></td>
                                <td><input type="text" className="input-field" placeholder="College Name" value={location} onChange={(e) => setLocation(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="Place" className="label">Place :</label></td>
                                <td><input type="text" className="input-field" placeholder="Place" value={place} onChange={(e) => setPlace(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="date" className="label">Date :</label></td>
                                <td><input type="date" className="input-field" value={date} onChange={(e) => setDate(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="volunteer" className="label">Required Volunteers:</label></td>
                                <td><input type="number" className="input-field" value={volunteer} onChange={(e) => setVol(e.target.value)} /></td>
                            </tr>

                            <button type="submit" className="submit-button">Submit</button>
                        </tbody>
                    </table>
                </form>
            )}

            <button onClick={() => setShowData(true)} className="show-data-button">Show my Database</button>

            {showData && (
                <div className="events-container">
                    {events.filter(event => event.hostId === localStorage.getItem("host_id")).length > 0 ? (
                        events
                            .filter(event => event.hostId === localStorage.getItem("host_id"))
                            .map((event, index) => (
                                <div key={index} className="event-card">
                                    <div><span className="event-label">Event Name:</span> <span>{event.companyName}</span></div>
                                    <div><span className="event-label">College Name:</span> <span>{event.location}</span></div>
                                    <div><span className="event-label">Place:</span> <span>{event.place}</span></div>
                                    <div><span className="event-label">Date:</span> <span>{event.date}</span></div>
                                    <div><span className="event-label">No of Volunteers:</span> <span>{event.volunteer}</span></div>

                                    <button onClick={() => setShowUser(!showUser)} className="show-volunteers-button">Joined Volunteers</button>

                                    {showUser && (
                                        <div className="volunteers-list">
                                            {users.filter(user => event.volunteers.includes(user._id)).map((user, index) => (
                                                <div key={index} className="user-card">
                                                    <div><span className="user-label">First Name:</span> <span>{user.firstName}</span></div>
                                                    <div><span className="user-label">Last Name:</span> <span>{user.lastName}</span></div>
                                                    <div><span className="user-label">Email:</span> <span>{user.email}</span></div>
                                                    <div><span className="user-label">Phone Number:</span> <span>{user.phoneNumber}</span></div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {editMode === event._id ? (
                                        <div className="edit-event-form">
                                            <input type="text" className="input-field" value={location} onChange={(e) => setLocation(e.target.value)} />
                                            <input type="text" className="input-field" value={place} onChange={(e) => setPlace(e.target.value)} />
                                            <input type="number" className="input-field" value={volunteer} onChange={(e) => setVol(e.target.value)} />
                                            <button onClick={() => handleUpdate(event._id)} className="save-button">Save</button>
                                            <button onClick={() => setEditMode(null)} className="cancel-button">Cancel</button>
                                        </div>
                                    ) : (
                                        <div className="event-actions">
                                            <button onClick={() => enableEdit(event)} className="edit-button">Edit</button>
                                            <button onClick={() => handleDelete(event._id)} className="delete-button">Delete</button>
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
