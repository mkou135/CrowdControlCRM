import React from 'react';

const ChartControls = ({ chartType, setChartType }) => {
  return (
    <div className="chart-controls">
      <button onClick={() => setChartType('pie')}>Pie Chart</button>
      <button onClick={() => setChartType('bar')}>Bar Chart</button>
      <button onClick={() => setChartType('line')}>Line Chart</button>
    </div>
  );
};

export default ChartControls;
