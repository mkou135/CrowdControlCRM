import React, { useState } from 'react';
import './Dashboard.css';

import {
  LineChart,
  BarChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const KPIs = () => {
  const sampleData = [
    { name: 'Jan', revenue: 5423, customerAcquisition: 21, marketingPerformance: 78 },
    { name: 'Feb', revenue: 5789, customerAcquisition: 24, marketingPerformance: 83 },
    { name: 'Mar', revenue: 6256, customerAcquisition: 26, marketingPerformance: 86 },
    { name: 'Apr', revenue: 6743, customerAcquisition: 29, marketingPerformance: 88 },
    { name: 'May', revenue: 7123, customerAcquisition: 31, marketingPerformance: 90 },
    { name: 'Jun', revenue: 7698, customerAcquisition: 33, marketingPerformance: 91 },
    { name: 'Jul', revenue: 8126, customerAcquisition: 35, marketingPerformance: 92 },
    { name: 'Aug', revenue: 8698, customerAcquisition: 38, marketingPerformance: 93 },
    { name: 'Sep', revenue: 9185, customerAcquisition: 41, marketingPerformance: 94 },
    { name: 'Oct', revenue: 9734, customerAcquisition: 44, marketingPerformance: 94 },
    { name: 'Nov', revenue: 10452, customerAcquisition: 48, marketingPerformance: 95 },
    { name: 'Dec', revenue: 11024, customerAcquisition: 51, marketingPerformance: 96 },
  ];

  const [activeGraph, setActiveGraph] = useState('revenueTargets');

  const handleSelectChange = (e) => {
    setActiveGraph(e.target.value);
  };

  const renderGraph = () => {
    if (activeGraph === 'revenueTargets') {
      return (
        <LineChart data={sampleData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
        </LineChart>
      );
    } else if (activeGraph === 'customerAcquisition') {
      return (
        <BarChart data={sampleData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="customerAcquisition" fill="#82ca9d" />
        </BarChart>
      );
    } else {
      return (
        <LineChart data={sampleData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="marketingPerformance" stroke="#ff7300" />
        </LineChart>
      );
    }
  };

  return (
    <div className="container">
        <h3>KPIs</h3>

        <select
        className="chart-select"
        value={activeGraph}
        onChange={(e) => setActiveGraph(e.target.value)}
        >
            <option value="revenueTargets">Revenue Targets</option>
            <option value="customerAcquisition">Customer Acquisition</option>
            <option value="marketingPerformance">Marketing Performance</option>
        </select>
        <ResponsiveContainer width="100%" height={300}>
        {renderGraph()}
        </ResponsiveContainer>
    </div>
    );
    };
    
    export default KPIs;