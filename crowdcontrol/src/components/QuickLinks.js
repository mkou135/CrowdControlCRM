import React from 'react';
import './QuickLinks.css';

const QuickLinks = () => {
  const links = [
    { label: 'User Profile', url: '/profile' },
    { label: 'Settings', url: '/settings' },
    { label: 'Feature 1', url: '/feature-1' },
    { label: 'Feature 2', url: '/feature-2' },
    { label: 'Feature 3', url: '/feature-3' },
  ];

  return (
    <div className="quick-links">
      <h2>Quick Links</h2>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.url}>{link.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuickLinks;
