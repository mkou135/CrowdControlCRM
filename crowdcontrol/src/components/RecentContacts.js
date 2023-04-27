import React from 'react';
import './RecentContacts.css';

const RecentContacts = () => {
  const contacts = [
    { id: 1, name: 'John Doe', phone: '555-123-4567', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', phone: '555-987-6543', email: 'jane.smith@example.com' },
    { id: 3, name: 'Michael Brown', phone: '555-333-1111', email: 'michael.brown@example.com' }

  ];

  return (
    <div className="recent-contacts">
      <h2>Recent Contacts</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <h3>{contact.name}</h3>
            <p>Phone: {contact.phone}</p>
            <p>Email: {contact.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentContacts;
