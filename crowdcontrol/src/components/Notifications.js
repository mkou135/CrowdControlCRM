import React from 'react';
import './Notifications.css';

const Notifications = () => {
  const sampleNotifications = [
    { id: 1, type: 'message', content: 'John sent you a new message.' },
    { id: 2, type: 'alert', content: 'Your monthly report is ready.' },
    { id: 3, type: 'update', content: 'New version of the app is available.' },
    { id: 4, type: 'message', content: 'Jane commented on your post.' },
    { id: 5, type: 'alert', content: 'Your password will expire in 7 days.' }
  ];

  return (
    <div className="notifications">
      <h2>Notifications</h2>
      <ul>
        {sampleNotifications.map(notification => (
          <li key={notification.id} className={notification.type}>
            {notification.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
