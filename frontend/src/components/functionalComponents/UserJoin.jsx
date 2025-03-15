import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const UserJoin = () => {
  const [events, setEvents] = useState([]);
  const [location, setLocation] = useState("");
  const [joinedEvents, setJoinedEvents] = useState([]);
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

  const handleJoin = async (eventId, index) => {
    if (joinedEvents.includes(index)) return; 

    try {
      const userId = localStorage.getItem('user_id');

      await axios.put(`http://localhost:3001/events/${eventId}/join`, { userId });

      setEvents((prevEvents) =>
        prevEvents.map((event, i) =>
          i === index && event._id === eventId
            ? { ...event, volunteer: event.volunteer - 1 }
            : event
        )
      );

      setJoinedEvents((prev) => [...prev, eventId]);

      console.log("UserId added to event successfully");

    } catch (error) {
      console.error("Error updating event:", error);
    }
};

  return (
    <div>
      <header>
        <nav>
          <button>
            <Link to="/">Logout</Link>
          </button>
        </nav>
      </header>

      <h2>User Page</h2>
      <label htmlFor="Location">Location</label>
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <h3>All Events</h3>
      {events.filter((event) => event.location === location).length > 0 ? (
        events
          .filter((event) => event.location === location)
          .map((event, index) => {
            const isJoined = joinedEvents.includes(event._id);

            return (
              <div
                key={event._id}
                style={{
                  border: "1px solid black",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                <p><strong>Event Name:</strong> {event.companyName}</p>
                
                {!isJoined && (
                  <>
                    <p><strong>Location:</strong> {event.location}</p>
                    <p><strong>Place:</strong> {event.place}</p>
                    <p><strong>Date:</strong> {event.date}</p>
                  </>
                )}

                <p><strong>No Volunteer Required:</strong> {event.volunteer}</p>

                <button 
                  onClick={() => handleJoin(event._id, index)} 
                  disabled={isJoined}
                >
                  {isJoined ? "Joined" : "Join"}
                </button>
              </div>
            );
          })
      ) : (
        <div style={{ textAlign: "center" }}>No events</div>
      )}
    </div>
  );
};

export default UserJoin;
