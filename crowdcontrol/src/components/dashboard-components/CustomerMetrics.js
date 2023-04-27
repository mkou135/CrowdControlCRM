import React, { useState } from 'react';
import './Dashboard.css';

import {
  Cell,
  LineChart,
  BarChart,
  PieChart,
  Line,
  Bar,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const CustomerMetrics = () => {
  const [selectedChart, setSelectedChart] = useState('satisfactionRating');

  const sampleData = {
    satisfactionRating: [
      { name: 'Jan', rating: 4.6 },
      { name: 'Feb', rating: 4.7 },
      { name: 'Mar', rating: 4.8 },
      { name: 'Apr', rating: 4.9 },
      { name: 'May', rating: 4.9 },
      { name: 'Jun', rating: 4.8 },
      { name: 'Jul', rating: 4.7 },
      { name: 'Aug', rating: 4.8 },
      { name: 'Sep', rating: 4.9 },
      { name: 'Oct', rating: 4.9 },
      { name: 'Nov', rating: 4.8 },
      { name: 'Dec', rating: 4.7 },
    ],
    repeatClients: [
      { name: 'Jan', clients: 4 },
      { name: 'Feb', clients: 6 },
      { name: 'Mar', clients: 8 },
      { name: 'Apr', clients: 10 },
      { name: 'May', clients: 12 },
      { name: 'Jun', clients: 14 },
      { name: 'Jul', clients: 16 },
      { name: 'Aug', clients: 18 },
      { name: 'Sep', clients: 20 },
      { name: 'Oct', clients: 22 },
      { name: 'Nov', clients: 24 },
      { name: 'Dec', clients: 26 },
    ],
    acquisitionChannels: [
      { name: 'Referrals', value: 27, fill: '#8884d8' },
      { name: 'Social Media', value: 44, fill: '#82ca9d' },
      { name: 'Search Engines', value: 29, fill: '#ffc658' },
    ],
  };
  

  const renderChart = () => {
    switch (selectedChart) {
      case 'satisfactionRating':
        return (
          <LineChart data={sampleData.satisfactionRating} className="chart">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="rating" stroke="#8884d8" />
          </LineChart>
        );
      case 'repeatClients':
        return (
          <BarChart data={sampleData.repeatClients}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="clients" fill="#82ca9d" />
          </BarChart>
        );
      case 'acquisitionChannels':
        return (
        <PieChart>
        <Pie
            data={sampleData.acquisitionChannels}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
        >
            {sampleData.acquisitionChannels.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
        </Pie>
        <Tooltip />
        <Legend />
        </PieChart>
        );
      default:
        return null;
    }
  };

  const handleSelectChange = (e) => {
    setSelectedChart(e.target.value);
  };
  return (

    <div className="container">
      <h3>Customer Metrics</h3>
      <select
        className="chart-select"
        value={selectedChart}
        onChange={handleSelectChange}
      >
        <option value="satisfactionRating">Social Media Engagement</option>
        <option value="repeatClients">Website Traffic</option>
        <option value="acquisitionChannels">Conversion Rates</option>
      </select>
      <ResponsiveContainer width="100%" height={300}>
        {renderChart()}
      </ResponsiveContainer>
      {/* <div>
        <button onClick={() => setSelectedChart('satisfactionRating')}>Satisfaction Rating</button>
        <button onClick={() => setSelectedChart('repeatClients')}>Repeat Clients</button>
        <button onClick={() => setSelectedChart('acquisitionChannels')}>Acquisition Channels</button>
      </div> */}
    </div>
  );
};

export default CustomerMetrics;
