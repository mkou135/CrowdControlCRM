import React, { useState, useEffect } from 'react';
import { BsEye, BsArrowsFullscreen, BsTrash } from 'react-icons/bs';
import './Clients.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredClients, setFilteredClients] = useState(clients);
  const [showAddClientForm, setShowAddClientForm] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);

  const handleDeleteClient = (client) => {
    setClientToDelete(client);
    setShowDeleteConfirmation(true);
  };

  const submitDeleteClient = async () => {
    try {
      const response = await axios.delete(`/api/clients/${clientToDelete.id}`);
      if (response.status === 200) {
        setShowDeleteConfirmation(false);
        fetchClients();
      }
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/clients');
      setClients(response.data.clients);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    setFilteredClients(clients);
  }, [clients]);

  const togglePopup = (client) => {
    if (popupVisible && selectedClient === client) {
      setPopupVisible(false);
    } else {
      setSelectedClient(client);
      setPopupVisible(true);
    }
  };

  const handleAddClient = () => {
    if (showAddClientForm) {
      document.querySelector('.add-client-form').classList.add('slideOut');
      setTimeout(() => {
        setShowAddClientForm(false);
        document.querySelector('.add-client-form').classList.remove('slideOut');
      }, 300);
    } else {
      setShowAddClientForm(true);
    }
  };

  const submitAddClient = async (client) => {
    try {
      const response = await axios.post('/api/add-client', client);
      if (response.status === 200) {
        setShowAddClientForm(false);
        fetchClients();
      }
    } catch (error) {
      console.error('Error adding client:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setFilteredClients(
      clients.filter((client) =>
        client.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <div className="clients">
      <h1>Clients</h1>
      <div className="clients-wrapper">
        <div className="client-list">
          <div className="search-add">
            <input
              type="text"
              value={searchText}
              onChange={handleSearch}
              placeholder="Search clients..."
            />
            <button className="add-client-button" onClick={handleAddClient}>
              Add Client
            </button>
          </div>
          {showDeleteConfirmation && (
            <div className="delete-confirmation">
              <p>Are you sure you want to delete {clientToDelete?.name}?</p>
              <button onClick={submitDeleteClient}>Yes</button>
              <button onClick={() => setShowDeleteConfirmation(false)}>
                No
              </button>
            </div>
          )}

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id}>
                  <td>{client.name}</td>
                  <td>{client.phone}</td>
                  <td>{client.email}</td>
                  <td>{client.address}</td>
                  <td>
                    <button
                      className="icon-button"
                      onClick={() => togglePopup(client)}
                    >
                      <BsEye />
                    </button>
                    <Link
                      to={`/client/${client.id}`}
                      className="icon-button"
                    >
                      <BsArrowsFullscreen />
                    </Link>
                    <button
                      className="bin-button icon-button"
                      onClick={() => handleDeleteClient(client)}
                    >
                      <BsTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showAddClientForm && (
          <div className="add-client-form">
            <h2>Add New Client</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitAddClient({
                  name: e.target.name.value,
                  phone: e.target.phone.value,
                  email: e.target.email.value,
                  address: e.target.address.value,
                });
              }}
            >
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />
              <br />
              <label htmlFor="phone">Phone:</label>
              <input type="text" id="phone" name="phone" required />
              <br />
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
              <br />
              <label htmlFor="address">Address:</label>
              <input type="text" id="address" name="address" required />
              <br />
              <label htmlFor="company">Company:</label>
              <input type="text" id="company" name="company" />
              <br />
              <label htmlFor="birthday">Birthday (Optional):</label>
              <input type="date" id="birthday" name="birthday" />
              <br />
              <label htmlFor="otherInfo">Other info:</label>
              <textarea id="otherInfo" name="otherInfo" rows="4" />
              <br />
              <button type="submit">Submit</button>
              <button type="button" onClick={handleAddClient}>Cancel</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Clients;

