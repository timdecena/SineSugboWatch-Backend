import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const TransactionForm = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentPrice, setPaymentPrice] = useState('');
  const [movieId, setMovieId] = useState('');
  const [movieTitle, setMovieTitle] = useState(''); // To hold the movie title
  const userId = localStorage.getItem('user_id');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const price = searchParams.get('price');
    const id = searchParams.get('movieId');

    if (price) setPaymentPrice(price);
    if (id) {
      setMovieId(id);
      fetchMovieTitle(id); // Fetch the movie title
    }
  }, [searchParams]);

  // Function to fetch the movie title
  const fetchMovieTitle = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/movies/getMovieById/${id}`);
      setMovieTitle(response.data.title); // Assuming the API response includes a 'title' field
    } catch (error) {
      console.error('Error fetching movie title:', error);
      setMovieTitle('Unknown Movie'); // Fallback in case of error
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
    <div>
      <h2>Add Transaction</h2>
      <form onSubmit={handleCreateTransaction}>
        <p>
          <strong>Movie Title:</strong> {movieTitle} {/* Display the movie title */}
        </p>
        <p>
          <strong>Payment Price:</strong> ${paymentPrice}
        </p>
        <input
          type="text"
          placeholder="Payment Method"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          required
        />
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default TransactionForm;
