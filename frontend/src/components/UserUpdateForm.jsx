// src/components/UserUpdateForm.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/UserUpdateForm.css';
import axios from 'axios';

const UserUpdateForm = () => {
  const { id } = useParams();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`http://localhost:8080/api/user/getAllUsers?id=${id}`);
        setUsername(response.data.username || ''); // Use empty strings if no data
        setEmail(response.data.email || '');
      } catch (err) {
        setError('Failed to fetch user data.');
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [id]);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await axios.put(`http://localhost:8080/api/user/putUserDetails/${id}`, {
        username,
        email,
        password,
      });
      
      setSuccess(true);
    } catch (err) {
      setError('Failed to update user.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-form-container">
      <h2>Update User</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">User updated successfully!</p>}
      
      <form onSubmit={handleUpdateUser}>
        <input
          type="text"
          placeholder="New Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="New Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update User'}
        </button>
      </form>
    </div>
  );
};

export default UserUpdateForm;
