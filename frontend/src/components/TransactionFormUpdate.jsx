// src/components/TransactionFormUpdate.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const TransactionFormUpdate = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState({ paymentmethod: '' });
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
      await axios.put(`http://localhost:8080/api/transaction/updateTransactionDetails/${id}`, transaction);
      alert('Transaction updated successfully');
      navigate('/transactions');
    } catch (error) {
      console.error('Error updating transaction:', error);
      alert('Failed to update transaction. Please check the console for details.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Transaction</h2>
      <label>
        Payment Method:
        <input
          type="text"
          name="paymentmethod"
          value={transaction.paymentmethod}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Update</button>
    </form>
  );
};

export default TransactionFormUpdate;