import React from 'react';
import './UpcomingEvents.css';

const UpcomingEvents = () => {
  const events = [
    { id: 1, title: 'Team Meeting', date: '2023-05-01 10:00' },
    { id: 2, title: 'Project Deadline', date: '2023-05-05 17:00' },
    { id: 3, title: 'Client Presentation', date: '2023-05-10 14:00' },
    { id: 4, title: 'Quarterly Review', date: '2023-05-15 11:00' },
    { id: 5, title: 'Office Party', date: '2023-05-20 18:00' },
  ];

  return (
    <div className="upcoming-events">
      <h2>Upcoming Events</h2>
      <div className="events-container">
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <h3>{event.title}</h3>
              <p>{new Date(event.date).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UpcomingEvents;
