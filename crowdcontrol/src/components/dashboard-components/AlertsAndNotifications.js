import React from 'react';
import './Dashboard.css';

const AlertsAndNotifications = () => {
  const sampleData = [
    { id: 1, type: 'warning', message: 'Revenue target for April not met.' },
    { id: 2, type: 'success', message: 'Customer acquisition goal achieved in March.' },
    { id: 3, type: 'warning', message: 'Marketing performance below target in February.' },
    // ... other sample alerts and notifications
  ];

  return (
    <div className="container">
      <h3>Alerts and Notifications</h3>
      <ul className="alerts-list">
        {sampleData.map((alert) => (
          <li key={alert.id} className={`alert-item ${alert.type}`}>
            {alert.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertsAndNotifications;
