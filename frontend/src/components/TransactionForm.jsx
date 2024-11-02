// src/components/TransactionForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const TransactionForm = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [movieId, setMovieId] = useState('');
  const userId = localStorage.getItem('user_id');

  const handleCreateTransaction = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/transaction/postTransactionRecord', {
        paymentmethod: paymentMethod,
        movies: { movie_id: movieId },
        user: { user_id: userId },
      });
      alert(`Transaction added with payment method: ${response.data.paymentmethod}`);
      setPaymentMethod('');
      setMovieId('');
    } catch (error) {
      console.error('Error adding transaction:', error);
      alert('Error adding transaction. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add Transaction</h2>
      <form onSubmit={handleCreateTransaction}>
        <input
          type="text"
          placeholder="Payment Method"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        <input
          type="text"
          placeholder="Movie ID"
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
        />
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default TransactionForm;