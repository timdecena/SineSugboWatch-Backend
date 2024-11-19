import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/TransactionList.css'; // Adjust the path as needed

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const userId = localStorage.getItem('user_id');
  const username = localStorage.getItem('username'); // Retrieve username from localStorage
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/transaction/getAllTransactions');
        const userTransactions = response.data.filter(
          (transaction) => transaction.user && String(transaction.user.user_id) === String(userId)
        );
        setTransactions(userTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [userId]);

  const handleDeleteTransaction = async (id) => {
    // Show confirmation prompt
    const confirmDelete = window.confirm(`Are you sure you want to delete the transaction with ID ${id}?`);
    if (!confirmDelete) return; // Exit if the user cancels

    try {
      await axios.delete(`http://localhost:8080/api/transaction/deleteTransactionDetails/${id}`);
      setTransactions(transactions.filter((transaction) => transaction.transaction_id !== id));
      alert('Transaction deleted successfully');
    } catch (error) {
      console.error('Error deleting transaction:', error);
      alert('Failed to delete transaction. Please check the console for details.');
    }
  };

  const handleEditTransaction = (id) => {
    navigate(`/update-transaction/${id}`);
  };

  const handleCreateTransaction = () => {
    navigate('/create-transaction');
  };

  return (
    <div className="container">
      <h2>{username ? `${username}'s Transactions` : 'Your Transactions'}</h2>
      {transactions.length > 0 ? (
        transactions.map((transaction) => (
          <div key={transaction.transaction_id} className="transaction-card">
            <p><span>ID:</span> {transaction.transaction_id}</p>
            <p><span>Payment Method:</span> {transaction.paymentmethod}</p>
            <button onClick={() => handleDeleteTransaction(transaction.transaction_id)}>Delete</button>
            <button onClick={() => handleEditTransaction(transaction.transaction_id)}>Edit</button>
          </div>
        ))
      ) : (
        <p className="no-transaction-message">No transactions found.</p>
      )}
      <button onClick={handleCreateTransaction}>Create Transaction</button>
    </div>
  );
};

export default TransactionList;
