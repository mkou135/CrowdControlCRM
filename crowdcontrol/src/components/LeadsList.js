import React, { useState, useEffect } from 'react';
import { BsEye, BsArrowsFullscreen, BsTrash } from 'react-icons/bs';
import './LeadsList.css';
import axios from 'axios';

const LeadsList = () => {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredLeads, setFilteredLeads] = useState(leads);
  const [showAddLeadForm, setShowAddLeadForm] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState(null);

  const handleDeleteLead = (lead) => {
    setLeadToDelete(lead);
    setShowDeleteConfirmation(true);
  };

  const submitDeleteLead = async () => {
    try {
      const response = await axios.delete(`/api/leads/${leadToDelete.id}`);
      if (response.status === 200) {
        setShowDeleteConfirmation(false);
        fetchLeads();
      }
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  const fetchLeads = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/leads');
      setLeads(response.data.leads);
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    setFilteredLeads(leads);
  }, [leads]);

  const togglePopup = (lead) => {
    if (popupVisible && selectedLead === lead) {
      setPopupVisible(false);
    } else {
      setSelectedLead(lead);
      setPopupVisible(true);
    }
  };

  const handleAddLead = () => {
    if (showAddLeadForm) {
      document.querySelector('.add-lead-form').classList.add('slideOut');
      setTimeout(() => {
        setShowAddLeadForm(false);
        document.querySelector('.add-lead-form').classList.remove('slideOut');
      }, 300);
    } else {
      setShowAddLeadForm(true);
    }
  };

  const submitAddLead = async (lead) => {
    try {
      const response = await axios.post('/api/add-lead', lead);
      if (response.status === 200) {
        setShowAddLeadForm(false);
        fetchLeads();
      }
    } catch (error) {
      console.error('Error adding lead:', error);
    }
  };

  const handleFullPageView = (lead) => {
    // Implement full page view logic here
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setFilteredLeads(
      leads.filter((lead) =>
        lead.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <div className="leads">
      <h2>List of all Leads</h2>
      <div className="leads-wrapper">
      <div className="lead-list">
        <div className="search-add">
          <input
            type="text"
            value={searchText}
            onChange={handleSearch}
            placeholder="Search leads..."
          />
          <button className="add-lead-button" onClick={handleAddLead}>Add Lead</button>
        </div>
        {showDeleteConfirmation && (
          <div className="delete-confirmation">
            <p>Are you sure you want to delete {leadToDelete?.name}?</p>
            <button onClick={submitDeleteLead}>Yes</button>
            <button onClick={() => setShowDeleteConfirmation(false)}>No</button>
          </div>
        )}

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead.id}>
                <td>{lead.name}</td>
                <td>{lead.company}</td>
                <td>{lead.email}</td>
                <td>{lead.phone}</td>
                <td>
                  <button className="icon-button" onClick={() => togglePopup(lead)}>
                    <BsEye />
                  </button>
                  <button className="icon-button" onClick={() => handleFullPageView(lead)}>
                    <BsArrowsFullscreen />
                  </button>
                  <button className="bin-button icon-button" onClick={() => handleDeleteLead(lead)}>
                    <BsTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
                
      {showAddLeadForm && (
        <div className="add-lead-form">
          <h2>Add New Lead</h2>
          <form onSubmit={(e) => {
              e.preventDefault();
              submitAddLead({
                name: e.target.name.value,
                company: e.target.company.value,
                email: e.target.email.value,
                phone: e.target.phone.value,
              });
            }}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
            <br />
            <label htmlFor="company">Company:</label>
            <input type="text" id="company" name="company" required />
            <br />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
            <br />
            <label htmlFor="phone">Phone:</label>
            <input type="text" id="phone" name="phone" required />
            <br />
            <button type="submit">Submit</button>
            <button type="button" onClick={handleAddLead}>Cancel</button>
          </form>
        </div>
      )}
    </div>
    </div>
  );
};

export default LeadsList;
