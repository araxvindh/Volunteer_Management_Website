import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const UserJoin = () => {
    const [events, setEvents] = useState([]);
    const [location, setLocation] = useState("");
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
                    <button><Link to='/'>Logout</Link></button>
                </nav>
            </header>

            <h2>User Page</h2>
            <label htmlFor="Location">Location</label>
            <input type="text" placeholder="Location" value={location} onChange={(e)=>{setLocation(e.target.value)}} />
            <h3>All Events</h3>
            <label htmlFor="Location"></label>
        {events.filter(event => (event.location)===(location)).length > 0 ? (
            events
                .filter(event => event.location ===  location)
                .map((event, index) => (
                    <div key={index} style={{display:"grid-inline",border:"1px solid black",padding:"10px"}}>
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
                ))
        ) : (
            <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>No events</td>
            </tr>
        )}
        </div>
    );
};

export default UserJoin;
