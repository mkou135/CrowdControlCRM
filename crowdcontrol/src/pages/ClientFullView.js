import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ClientFullView.css';

const ClientFullView = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/clients/${clientId}`);
        setClient(response.data.client);
      } catch (error) {
        console.error('Error fetching client:', error);
      }
    };

    fetchClient();
  }, [clientId]);

  if (!client) {
    return <div>Loading...</div>;
  }

  return (
    <div className="client-full-view">
      <div className="back-button">
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
      <div className="quick-links">
        {/* Add quick-links content here */}
      </div>
      <div className="details">
        <h2>Client Information: {client.name}</h2>
        <p>Name: {client.name}</p>
        <p>Phone: {client.phone}</p>
        <p>Email: {client.email}</p>
        <p>Address: {client.address}</p>
        {/* Add more fields as required */}
      </div>
    </div>
  );
  
};

export default ClientFullView;
