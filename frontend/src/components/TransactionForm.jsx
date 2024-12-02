import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import '../assets/TransactionForm.css'; // Link to the CSS file

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

const TransactionForm = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentPrice, setPaymentPrice] = useState('');
  const [movieId, setMovieId] = useState('');
  const [movieTitle, setMovieTitle] = useState('');
  const userId = localStorage.getItem('user_id');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const price = searchParams.get('price');
    const id = searchParams.get('movieId');

    if (price) setPaymentPrice(price);
    if (id) {
      setMovieId(id);
      fetchMovieTitle(id);
    }
  }, [searchParams]);

  const fetchMovieTitle = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/movies/getMovieById/${id}`);
      setMovieTitle(response.data.title);
    } catch (error) {
      console.error('Error fetching movie title:', error);
      setMovieTitle('Unknown Movie');
    }
  };

  const handleCreateTransaction = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/transaction/postTransactionRecord', {
        paymentmethod: paymentMethod,
        paymentprice: paymentPrice,
        movies: { movie_id: movieId },
        user: { user_id: userId },
      });
      alert(`Transaction added with payment method: ${response.data.paymentmethod}`);
      setPaymentMethod('');
    } catch (error) {
      console.error('Error adding transaction:', error);
      alert('Error adding transaction. Please try again.');
    }
  };

  return (
    <div className="transaction-form-container">
      <h2 className="form-title">Add Transaction</h2>
      <form onSubmit={handleCreateTransaction} className="transaction-form">
        <div className="form-group">
          <label className="form-label">Movie Title:</label>
          <p className="form-value">{movieTitle}</p>
        </div>
        <div className="form-group">
          <label className="form-label">Payment Price:</label>
          <p className="form-value">${paymentPrice}</p>
        </div>
        <div className="form-group">
          <label className="form-label">Payment Method:</label>
          <div className="custom-dropdown">
            {paymentMethods.map((method) => (
              <div
                key={method.value}
                className={`dropdown-item ${paymentMethod === method.value ? 'selected' : ''}`}
                onClick={() => setPaymentMethod(method.value)}
              >
                <img src={method.icon} alt={method.label} className="dropdown-icon" />
                <span>{method.label}</span>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="submit-button">
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
