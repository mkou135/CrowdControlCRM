import React from 'react';
import './Navbar.css';

const Navbar = ({ toggleSidebar, toggleDarkMode }) => {
  return (
    <div className="navbar">
      <button onClick={toggleSidebar} className="sidebar-toggle">
        Menu
      </button>
      <div className="navbar-brand">
        CrowdControl
      </div>
      <div className="navbar-actions">
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
          Toggle Dark Mode
        </button>
      </div>
    </div>
  );
};

export default Navbar;
