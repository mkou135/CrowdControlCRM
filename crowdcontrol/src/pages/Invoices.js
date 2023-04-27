import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import './Invoices.css';
import InvoiceTable from '../components/invoices-components/InvoiceTable';
import ExpenseTable from '../components/invoices-components/ExpenseTable';
import ChartControls from '../components/invoices-components/ChartControls';
import ChartContainer from '../components/invoices-components/ChartContainer';
import LineChartControls from '../components/invoices-components/LineChartControls';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF8888'];


const Invoices = () => {
  const [invoices, setInvoices] = useState([
    {
      id: 1,
      client: 'Client A',
      date: '2023-04-01',
      amount: 1000,
      status: 'paid'
    },
    {
      id: 2,
      client: 'Client B',
      date: '2023-04-10',
      amount: 1500,
      status: 'overdue'
    },
    {
      id: 3,
      client: 'Client C',
      date: '2023-04-15',
      amount: 2000,
      status: 'partially paid'
    }
  ]);

  const [expenses, setExpenses] = useState([
    { id: 1, type: 'Travel', amount: 200 },
    { id: 2, type: 'Web Hosting', amount: 50 },
    { id: 3, type: 'Equipment Hire', amount: 150 },
    { id: 4, type: 'Replacing Broken Equipment', amount: 100 },
    { id: 5, type: 'DJ Payments', amount: 500 },
    { id: 6, type: 'Parking Costs', amount: 30 },
    { id: 7, type: 'Advertising', amount: 120 },
  ]);

  const [chartType, setChartType] = useState('pie');
  const [lineChartMonths, setLineChartMonths] = useState(12);


  const chartData = [
    { name: 'Revenue', value: 20000 },
    { name: 'Outstanding Invoices', value: 5000 },
    { name: 'Average Payment Time', value: 30 },
  ];



    const generateLast12MonthsData = () => {
        const currentDate = new Date();
        const currentMonthIndex = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      
        let data = [
            { month: 'Jan', year: 2023, revenue: 1323 },
            { month: 'Feb', year: 2023, revenue: 2456 },
            { month: 'Mar', year: 2023, revenue: 3278 },
            { month: 'Apr', year: 2023, revenue: 1984 },
            { month: 'May', year: 2023, revenue: 2743 },
            { month: 'Jun', year: 2023, revenue: 3121 },
            { month: 'Jul', year: 2023, revenue: 2849 },
            { month: 'Aug', year: 2023, revenue: 2537 },
            { month: 'Sep', year: 2023, revenue: 3412 },
            { month: 'Oct', year: 2023, revenue: 2965 },
            { month: 'Nov', year: 2023, revenue: 2538 },
            { month: 'Dec', year: 2023, revenue: 3619 },
        ];
      
        let lastYearData = [
            { month: 'Jan', year: 2022, revenue: 1123 },
            { month: 'Feb', year: 2022, revenue: 1656 },
            { month: 'Mar', year: 2022, revenue: 2278 },
            { month: 'Apr', year: 2022, revenue: 1354 },
            { month: 'May', year: 2022, revenue: 3213 },
            { month: 'Jun', year: 2022, revenue: 1221 },
            { month: 'Jul', year: 2022, revenue: 2249 },
            { month: 'Aug', year: 2022, revenue: 2437 },
            { month: 'Sep', year: 2022, revenue: 3112 },
            { month: 'Oct', year: 2022, revenue: 2365 },
            { month: 'Nov', year: 2022, revenue: 2568 },
            { month: 'Dec', year: 2022, revenue: 3934 },
        ];
      
        const expensesData = [
            { month: 'Jan', year: 2022, expenses: 503 },
            { month: 'Feb', year: 2022, expenses: 656 },
            { month: 'Mar', year: 2022, expenses: 1278 },
            { month: 'Apr', year: 2022, expenses: 184 },
            { month: 'May', year: 2022, expenses: 313 },
            { month: 'Jun', year: 2022, expenses: 221 },
            { month: 'Jul', year: 2022, expenses: 1159 },
            { month: 'Aug', year: 2022, expenses: 1437 },
            { month: 'Sep', year: 2022, expenses: 1612 },
            { month: 'Oct', year: 2022, expenses: 1765 },
            { month: 'Nov', year: 2022, expenses: 1568 },
            { month: 'Dec', year: 2022, expenses: 1434 },
            { month: 'Jan', year: 2023, expenses: 323 },
            { month: 'Feb', year: 2023, expenses: 1146 },
            { month: 'Mar', year: 2023, expenses: 1278 },
            { month: 'Apr', year: 2023, expenses: 984 },
            { month: 'May', year: 2023, expenses: 1443 },
            { month: 'Jun', year: 2023, expenses: 1511 },
            { month: 'Jul', year: 2023, expenses: 549 },
            { month: 'Aug', year: 2023, expenses: 1237 },
            { month: 'Sep', year: 2023, expenses: 1235 },
            { month: 'Oct', year: 2023, expenses: 1532 },
            { month: 'Nov', year: 2023, expenses: 1245 },
            { month: 'Dec', year: 2023, expenses: 2643 },
          ];
          

            const last12MonthsData = [];

            for (let i = 0; i < 12; i++) {
              const monthIndex = (currentMonthIndex + i + 1) % 12;
              const yearOffset = i <= currentMonthIndex ? 0 : -1;
              const year = currentYear + yearOffset;
              const monthName = monthNames[monthIndex];
          
              let monthData = data.find(item => item.month === monthName && item.year === year);
              if (!monthData) {
                monthData = lastYearData.find(item => item.month === monthName && item.year === year);
              }
          
              let monthExpensesData = expensesData.find(item => item.month === monthName && item.year === year);
              if (!monthExpensesData) {
                monthExpensesData = expensesData.find(item => item.month === monthName && item.year === year);
            }
          
              if (monthData && monthExpensesData) {
                last12MonthsData.push({
                  month: monthData.month,
                  revenue: monthData.revenue,
                  expenses: monthExpensesData.expenses,
                  profit: monthData.revenue - monthExpensesData.expenses,
                });
              }
            }
          
            return last12MonthsData;
          };
      const lineChartData = generateLast12MonthsData();
      
      const renderChart = () => {
        switch (chartType) {
          case 'pie':
            return (
              <PieChart className="centered-chart" width={400} height={400}>
                <Pie data={chartData} dataKey="value" cx={200} cy={200} outerRadius={100} label>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            );
          case 'bar':
            return (
              <BarChart width={750} height={300} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" type="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" name="Invoices" />
              </BarChart>
            );
          case 'line':
            const displayedData = lineChartData.slice(-lineChartMonths);
            return (
              <LineChart width={750} height={300} data={displayedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" type="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Revenue" />
                <Line type="monotone" dataKey="expenses" stroke="#82ca9d" name="Expenses" />
                <Line type="monotone" dataKey="profit" stroke="#FF8042" name="Profit" />
              </LineChart>
            );
    
          default:
            return <PieChart />;
        }
      };
    
      return (
        <div className="invoices">
          <h2>Invoices</h2>
          <InvoiceTable invoices={invoices} />
          <ChartControls chartType={chartType} setChartType={setChartType} />
          <ChartContainer renderChart={renderChart} />
          <LineChartControls chartType={chartType} setLineChartMonths={setLineChartMonths} />
          <ExpenseTable expenses={expenses} />
        </div>
      );
    };
    
    export default Invoices;