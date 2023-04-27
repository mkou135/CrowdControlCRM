import React from 'react';

const ExpenseTable = ({ expenses }) => {
  return (
    <table className="styled-table">
      <thead>
        <tr>
          <th>Expense ID</th>
          <th>Category</th>
          <th>Date</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map(expense => (
          <tr key={expense.id}>
            <td>{expense.id}</td>
            <td>{expense.category}</td>
            <td>{expense.date}</td>
            <td>{expense.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseTable;
