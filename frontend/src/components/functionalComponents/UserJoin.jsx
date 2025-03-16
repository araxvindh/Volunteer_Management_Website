import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import '../css/userJoin.css';

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

  // Check if the event contains the user ID in the volunteers list
  const checkIfJoined = (event) => {
    const userId = localStorage.getItem('user_id');
    return event.volunteers && event.volunteers.includes(userId);
  };

  const handleJoin = async (eventId, index) => {
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

      // Add to the joinedEvents list
      setJoinedEvents((prev) => [...prev, eventId]);

      console.log("UserId added to event successfully");
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const filteredEvents = location
    ? events.filter((event) => event.location.toLowerCase().includes(location.toLowerCase()))
    : events;

  // Separate events into available and joined based on the volunteers array in DB
  const availableEvents = filteredEvents.filter(event => !checkIfJoined(event));
  const joinedEventList = filteredEvents.filter(event => checkIfJoined(event));

  return (
    <div className="user-join-container">
      <header className="header">
        <nav className="nav">
          <button className="logout-button">
            <Link to="/">Logout</Link>
          </button>
        </nav>
      </header>

      <h2 className="page-title">Student Page</h2>
      <label htmlFor="Location" className="location-label">Search</label>
      <input
        type="text"
        placeholder="College Name"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="location-input"
      />

      <h3 className="events-title">Available Events</h3>
      {availableEvents.length > 0 ? (
        availableEvents.map((event, index) => (
          <div key={event._id} className="event-card">
            <p><strong>Event Name:</strong> {event.companyName}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Place:</strong> {event.place}</p>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>No Volunteer Required:</strong> {event.volunteer}</p>
            <button 
              onClick={() => handleJoin(event._id, index)} 
              disabled={checkIfJoined(event)}
              className="join-button"
            >
              {checkIfJoined(event) ? "Joined" : "Join"}
            </button>
          </div>
        ))
      ) : (
        <div className="no-events">No available events</div>
      )}

      <h3 className="events-title">Joined Events</h3>
      {joinedEventList.length > 0 ? (
        joinedEventList.map((event) => (
          <div key={event._id} className="event-card">
            <p><strong>Event Name:</strong> {event.companyName}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Place:</strong> {event.place}</p>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>No Volunteer Required:</strong> {event.volunteer}</p>
            <button disabled className="join-button">
              Joined
            </button>
          </div>
        ))
      ) : (
        <div className="no-events">No events joined</div>
      )}
    </div>
  );
};

export default UserJoin;
