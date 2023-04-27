import React from 'react';

const LineChartControls = ({ chartType, setLineChartMonths }) => {
  return (
    chartType === 'line' && (
      <div className="line-chart-controls">
        <button onClick={() => setLineChartMonths(3)}>3 Months</button>
        <button onClick={() => setLineChartMonths(6)}>6 Months</button>
        <button onClick={() => setLineChartMonths(12)}>12 Months</button>
      </div>
    )
  );
};

export default LineChartControls;
