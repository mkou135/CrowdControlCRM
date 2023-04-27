import React, { useState } from 'react';
import './Dashboard.css';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const FinancialMetrics = () => {
  const sampleData = [
    { name: 'Jan', revenue: 10000, expenses: 6000, profit: 4000 },
    { name: 'Feb', revenue: 12000, expenses: 7000, profit: 5000 },
    { name: 'Mar', revenue: 13000, expenses: 8000, profit: 5000 },
    { name: 'Apr', revenue: 14000, expenses: 9000, profit: 5000 },
    { name: 'May', revenue: 15000, expenses: 10000, profit: 5000 },
    { name: 'Jun', revenue: 16000, expenses: 11000, profit: 5000 },
    { name: 'Jul', revenue: 17000, expenses: 12000, profit: 5000 },
    { name: 'Aug', revenue: 18000, expenses: 13000, profit: 5000 },
    { name: 'Sep', revenue: 19000, expenses: 14000, profit: 5000 },
    { name: 'Oct', revenue: 20000, expenses: 15000, profit: 5000 },
    { name: 'Nov', revenue: 21000, expenses: 16000, profit: 5000 },
    { name: 'Dec', revenue: 22000, expenses: 17000, profit: 5000 },
  ];

  return (
    <div className="container">
      <h3>Financial Metrics</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={sampleData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
          <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
          <Line type="monotone" dataKey="profit" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinancialMetrics;
