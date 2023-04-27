import React from 'react';

const InvoiceTable = ({ invoices }) => {
  return (
    <table className="styled-table">
      <thead>
        <tr>
          <th>Invoice ID</th>
          <th>Client</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map(invoice => (
          <tr key={invoice.id}>
            <td>{invoice.id}</td>
            <td>{invoice.client}</td>
            <td>{invoice.date}</td>
            <td>{invoice.amount}</td>
            <td>{invoice.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InvoiceTable;
