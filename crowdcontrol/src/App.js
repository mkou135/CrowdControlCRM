import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Leads from './pages/Leads';
import Clients from './pages/Clients';
import Events from './pages/Events';
import Invoices from './pages/Invoices';
import Settings from './pages/Settings';
import CreateInvoice from './pages/CreateInvoice';
import ClientFullView from './pages/ClientFullView';


function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/events" element={<Events />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/createinvoice" element={<CreateInvoice />} />
            <Route path="/client/:clientId" element={<ClientFullView />} />

          </Routes>
        </div>
    </Router>
  );
}

export default App;
