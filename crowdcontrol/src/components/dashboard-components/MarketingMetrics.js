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

const MarketingMetrics = () => {
    const sampleData = [
        { name: 'Jan', likes: 122, shares: 27, comments: 35, followers: 11, websiteTraffic: 5002, conversionRate: 5.2 },
        { name: 'Feb', likes: 155, shares: 32, comments: 42, followers: 14, websiteTraffic: 5578, conversionRate: 6.1 },
        { name: 'Mar', likes: 183, shares: 38, comments: 51, followers: 17, websiteTraffic: 6043, conversionRate: 6.7 },
        { name: 'Apr', likes: 204, shares: 44, comments: 59, followers: 19, websiteTraffic: 6578, conversionRate: 7.3 },
        { name: 'May', likes: 223, shares: 50, comments: 68, followers: 22, websiteTraffic: 7076, conversionRate: 7.9 },
        { name: 'Jun', likes: 247, shares: 55, comments: 74, followers: 25, websiteTraffic: 7521, conversionRate: 8.4 },
        { name: 'Jul', likes: 269, shares: 62, comments: 82, followers: 28, websiteTraffic: 8023, conversionRate: 8.9 },
        { name: 'Aug', likes: 293, shares: 68, comments: 91, followers: 31, websiteTraffic: 8580, conversionRate: 9.5 },
        { name: 'Sep', likes: 318, shares: 74, comments: 101, followers: 34, websiteTraffic: 9125, conversionRate: 10.1 },
        { name: 'Oct', likes: 343, shares: 80, comments: 109, followers: 36, websiteTraffic: 9627, conversionRate: 10.7 },
        { name: 'Nov', likes: 375, shares: 86, comments: 118, followers: 39, websiteTraffic: 10122, conversionRate: 11.3 },
        { name: 'Dec', likes: 402, shares: 93, comments: 127, followers: 42, websiteTraffic: 10647, conversionRate: 11.9 },
      ];
      

  const [activeGraph, setActiveGraph] = useState('socialMedia');

  const renderGraph = () => {
    if (activeGraph === 'socialMedia') {
      return (
        <LineChart data={sampleData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="likes" stroke="#8884d8" />
          <Line type="monotone" dataKey="shares" stroke="#82ca9d" />
          <Line type="monotone" dataKey="comments" stroke="#ff7300" />
          <Line type="monotone" dataKey="followers" stroke="#FF00FF" />
        </LineChart>
      );
    } else if (activeGraph === 'websiteTraffic') {
      return (
        <LineChart data={sampleData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="websiteTraffic" stroke="#8884d8" />
        </LineChart>
      );
    } else {
      return (
        <BarChart data={sampleData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="conversionRate" fill="#8884d8" />
        </BarChart>
      );
    }
  };

  const handleSelectChange = (e) => {
    setActiveGraph(e.target.value);
  };

  return (
    <div className="container">
      <h3>Marketing Metrics</h3>
      <select
        className="chart-select"
        value={activeGraph}
        onChange={handleSelectChange}
      >
        <option value="socialMedia">Social Media Engagement</option>
        <option value="websiteTraffic">Website Traffic</option>
        <option value="conversionRates">Conversion Rates</option>
      </select>
      <ResponsiveContainer width="100%" height={300}>
        {renderGraph()}
      </ResponsiveContainer>
    </div>
  );
};

export default MarketingMetrics;
