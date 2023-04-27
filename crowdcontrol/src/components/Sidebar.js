import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar${isOpen ? ' open' : ''}`}>
      <div className="sidebar-arrow" onClick={toggleSidebar}>
        {isOpen ? <span>&#8592;</span> : <span>&#8594;</span>}
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/" activeClassName="active" exact>
          Home
        </NavLink>
        <NavLink to="/leads" activeClassName="active">
          Leads
        </NavLink>
        <NavLink to="/clients" activeClassName="active">
          Clients
        </NavLink>
        <NavLink to="/events" activeClassName="active">
          Events
        </NavLink>
        <NavLink to="/invoices" activeClassName="active">
          Invoices
        </NavLink>
        <NavLink to="/createinvoice" activeClassName="active">
          Invoice Generator
        </NavLink>
        <NavLink to="/settings" activeClassName="active">
          Settings
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
