import html2canvas from 'html2canvas';
import React, { useState, useRef } from 'react';
import './CreateInvoice.css';
import html2pdf from 'html2pdf.js';
import axios from 'axios';


const CreateInvoice = () => {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [items, setItems] = useState([{ description: '', quantity: 1, rate: 0 }]);
  const invoiceRef = useRef();

  const [tax, setTax] = useState(0);
  const [additionalCharges, setAdditionalCharges] = useState(0);
  const [paymentTerms, setPaymentTerms] = useState('');
  const [logo, setLogo] = useState(null);

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const getLogoDataURL = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target.result);
      };
      reader.readAsDataURL(file);
    });
  };
  

  const downloadInvoice = async () => {
    const invoiceElement = invoiceRef.current;
    const opt = {
      margin: 1,
      filename: `invoice-${clientName.replace(/\s+/g, '-').toLowerCase()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
  
    // Add logo to invoice content
    if (logo) {
      const logoElement = invoiceElement.querySelector('.invoice-logo');
      const imgData = await getLogoDataURL(logo);
      logoElement.src = imgData;
    }
  
    html2pdf().from(invoiceElement).set(opt).save();
  };
        

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, rate: 0 }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Implement API integration to save invoice data
    try {
      const response = await axios.post('http://localhost:5000/api/add-invoice', {
        client_id: 1, // You need to provide a valid client ID here
        tax: tax,
        additional_charges: additionalCharges,
        payment_terms: paymentTerms,
        logo: logo ? logo.name : ''
      });
  
      if (response.data.status === 'success') {
        console.log('Invoice added successfully');
        // Clear the form or redirect to another page
      } else {
        console.error('Error adding invoice');
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  
    console.log({
      clientName,
      clientEmail,
      clientAddress,
      items,
      tax,
      additionalCharges,
      paymentTerms,
      logo
    });
  };
  
  return (
    <div className="create-invoice">
      <h2>Create Invoice</h2>
      <form onSubmit={handleSubmit}>
        <div className="client-info">
          <h3>Client Information</h3>
          <input
            type="text"
            placeholder="Client Name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Client Email"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Client Address"
            value={clientAddress}
            onChange={(e) => setClientAddress(e.target.value)}
          />
        </div>
        <div className="items">
          <h3>Items</h3>
          {items.map((item, index) => (
            <div key={index} className="item">
              <input
                type="text"
                placeholder="Description"
                value={item.description}
                onChange={(e) => handleItemChange(index, 'description', e.target.value)}
              />
              <input
                type="number"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
              />
              <input
                type="number"
                placeholder="Rate"
                value={item.rate}
                onChange={(e) => handleItemChange(index, 'rate', parseFloat(e.target.value))}
              />
              <button type="button" onClick={() => removeItem(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addItem}>
            Add Item
          </button>
        </div>
        <div className="tax-additional">
          <h3>Tax and Additional Charges</h3>
          <input
            type="number"
            placeholder="Tax (%)"
            value={tax}
            onChange={(e) => setTax(parseFloat(e.target.value))}
          />
          <input
            type="number"
            placeholder="Additional Charges"
            value={additionalCharges}
            onChange={(e) => setAdditionalCharges(parseFloat(e.target.value))}
          />
        </div>
        <div className="payment-terms-logo">
          <h3>Payment Terms and Logo</h3>
          <textarea
            placeholder="Payment Terms"
            value={paymentTerms}
            onChange={(e) => setPaymentTerms(e.target.value)}
          />
          <div className="logo-upload">
            <label htmlFor="logo">Upload Logo</label>
            <input type="file" id="logo" accept="image/*" onChange={handleLogoChange} />
          </div>
        </div>
        <button type="submit">Save Invoice</button>
      </form>

      {/* Add the invoice content for PDF generation */}
      <div ref={invoiceRef} style={{ visibility: 'hidden', position: 'absolute', left: '-10000px', top: '-10000px' }}>
        <h1>Invoice</h1>
        <div className="invoice-details">
  <img className="invoice-logo" alt="Logo" />
  {/* The rest of the invoice content */}
</div>
        <h2>Client Information</h2>
        <p>Name: {clientName}</p>
        <p>Email: {clientEmail}</p>
        <p>Address: {clientAddress}</p>
        <h2>Items</h2>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>{item.rate.toFixed(2)}</td>
                <td>{(item.quantity * item.rate).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>Tax and Additional Charges</h2>
        <p>Tax: {tax.toFixed(2)}%</p>
        <p>Additional Charges: {additionalCharges.toFixed(2)}</p>
        <h2>Payment Terms</h2>
        <p>{paymentTerms}</p>
      </div>

      <button onClick={downloadInvoice}>Download Invoice</button>

    </div>
  );
};

export default CreateInvoice;
