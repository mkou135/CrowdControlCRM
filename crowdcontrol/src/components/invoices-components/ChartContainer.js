import React from 'react';

const ChartContainer = ({ renderChart }) => {
  return <div className="chart-container">{renderChart()}</div>;
};

export default ChartContainer;
