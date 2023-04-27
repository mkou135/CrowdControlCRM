import React from 'react';
import SalesMetrics from '../components/dashboard-components/SalesMetrics';
import MarketingMetrics from '../components/dashboard-components/MarketingMetrics';
import CustomerMetrics from '../components/dashboard-components/CustomerMetrics';
import FinancialMetrics from '../components/dashboard-components/FinancialMetrics';
import KPIs from '../components/dashboard-components/KPIs';
import AlertsAndNotifications from '../components/dashboard-components/AlertsAndNotifications';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <h1>Dashboard</h1>
      <div className="components-wrapper">
      <SalesMetrics />
      <MarketingMetrics />
      <AlertsAndNotifications />
      <CustomerMetrics />
      <FinancialMetrics />
      <KPIs />

      </div>
    </div>
  );
};

export default Home;
