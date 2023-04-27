import React from 'react';
import './Leads.css';
import LeadsList from '../components/LeadsList';

const Leads = () => {
  return (
    <div className="leads">
      <h1>Leads</h1>
      <LeadsList />
    </div>
  );
};

export default Leads;
