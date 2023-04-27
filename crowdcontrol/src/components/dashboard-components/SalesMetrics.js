import React, { useState } from 'react';
import './Dashboard.css';

import {
  Cell,
  BarChart,
  LineChart,
  PieChart,
  Bar,
  Line,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const SalesMetrics = () => {
  const [selectedChart, setSelectedChart] = useState('bookedEvents');

  const sampleData = {
    bookedEvents: [
    { name: 'Jan', events: 10 },
    { name: 'Feb', events: 12 },
    { name: 'Mar', events: 15 },
    { name: 'Apr', events: 18 },
    { name: 'May', events: 20 },
    { name: 'Jun', events: 22 },
    { name: 'Jul', events: 25 },
    { name: 'Aug', events: 28 },
    { name: 'Sep', events: 30 },
    { name: 'Oct', events: 35 },
    { name: 'Nov', events: 40 },
    { name: 'Dec', events: 45 },
    ],
    revenuePerEvent: [
    { name: 'Jan', revenue: 500 },
    { name: 'Feb', revenue: 550 },
    { name: 'Mar', revenue: 600 },
    { name: 'Apr', revenue: 700 },
    { name: 'May', revenue: 750 },
    { name: 'Jun', revenue: 800 },
    { name: 'Jul', revenue: 900 },
    { name: 'Aug', revenue: 1000 },
    { name: 'Sep', revenue: 1100 },
    { name: 'Oct', revenue: 1200 },
    { name: 'Nov', revenue: 1300 },
    { name: 'Dec', revenue: 1400 },
    ],
    revenueByEventType: [
        { name: 'Weddings', value: 12629, fill: '#8884d8' },
        { name: 'Corporate Events', value: 12361, fill: '#82ca9d' },
        { name: 'Private Parties', value: 7925, fill: '#ffc658' },
      ],
      
  };

  const renderChart = () => {
    switch (selectedChart) {
      case 'bookedEvents':
        return (
          <BarChart data={sampleData.bookedEvents} className="chart">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="events" fill="#8884d8" />
          </BarChart>
        );
      case 'revenuePerEvent':
        return (
          <LineChart data={sampleData.revenuePerEvent} className="chart">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
          </LineChart>
        );
      case 'revenueByEventType':

      
        return (
            <PieChart className="chart">
            <Pie
              data={sampleData.revenueByEventType}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {
                sampleData.revenueByEventType.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))
              }
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
      <h3>Sales Metrics</h3>
      <select
        className="chart-select"
        value={selectedChart}
        onChange={handleSelectChange}
      >
        <option value="bookedEvents">Booked Events</option>
        <option value="revenuePerEvent">Revenue per Event</option>
        <option value="revenueByEventType">Revenue by Event Type</option>
      </select>
      <ResponsiveContainer width="100%" height="90%">
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default SalesMetrics;
