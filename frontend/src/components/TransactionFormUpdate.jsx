import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import creditCardIcon from '../assets/images/creditcard.png';
import paypalIcon from '../assets/images/paypal.png';
import bankIcon from '../assets/images/banktransfer.png';
import cashIcon from '../assets/images/cash.png';
import googlePayIcon from '../assets/images/googlepay.png';

const paymentMethods = [
  { value: 'Credit Card', label: 'Visa', icon: creditCardIcon },
  { value: 'PayPal', label: 'PayPal', icon: paypalIcon },
  { value: 'Bank Transfer', label: 'Bank Transfer', icon: bankIcon },
  { value: 'Cash', label: 'Cash', icon: cashIcon },
  { value: 'Google Pay', label: 'Google Pay', icon: googlePayIcon },
];

const TransactionFormUpdate = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState({ paymentmethod: '', paymentprice: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/transaction/getTransactionDetails/${id}`);
        setTransaction(response.data);
      } catch (error) {
        console.error('Error fetching transaction:', error);
      }
    };
    fetchTransaction();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the updated payment method only
      const updatedTransaction = { paymentmethod: transaction.paymentmethod };

      await axios.put(`http://localhost:8080/api/transaction/updateTransactionDetails/${id}`, updatedTransaction);
      alert('Transaction updated successfully');
      navigate('/transactions');
    } catch (error) {
      console.error('Error updating transaction:', error);
      alert('Failed to update transaction. Please check the console for details.');
    }
  };

  const handlePaymentMethodChange = (method) => {
    setTransaction((prev) => ({ ...prev, paymentmethod: method }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Transaction</h2>

      <div className="form-group">
        <label className="form-label">Payment Method:</label>
        <div className="custom-dropdown">
          {paymentMethods.map((method) => (
            <div
              key={method.value}
              className={`dropdown-item ${transaction.paymentmethod === method.value ? 'selected' : ''}`}
              onClick={() => handlePaymentMethodChange(method.value)}
            >
              <img src={method.icon} alt={method.label} className="dropdown-icon" />
              <span>{method.label}</span>
            </div>
          ))}
        </div>
      </div>

      <button type="submit" className="submit-button">Update</button>
    </form>
  );
};

export default TransactionFormUpdate;
