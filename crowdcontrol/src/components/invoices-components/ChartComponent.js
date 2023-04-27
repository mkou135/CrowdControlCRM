import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';

const ChartComponent = ({ chartType, chartData, COLORS, renderChart }) => {
  return (
    <div className="chart-container">
      {renderChart(chartType, chartData, COLORS)}
    </div>
  );
};

export default ChartComponent;
