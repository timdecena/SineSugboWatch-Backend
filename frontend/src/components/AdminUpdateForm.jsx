// src/components/AdminUpdateForm.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/AdminUpdateForm.css';
import axios from 'axios';

const AdminUpdateForm = () => {
  const { id } = useParams();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`http://localhost:8080/api/admin/getAllAdmins?id=${id}`);
        setUsername(response.data.username || '');
        setEmail(response.data.email || '');
      } catch (err) {
        setError('Failed to fetch admin data.');
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, [id]);

  const handleUpdateAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await axios.put(`http://localhost:8080/api/admin/putAdminDetails/${id}`, {
        username,
        email,
        password,
      });
      setSuccess(true);
      setPassword(''); // Clear password field after successful update
    } catch (err) {
      setError('Failed to update admin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-form-container">
      <h2>Update Admin</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Admin updated successfully!</p>}
      
      <form onSubmit={handleUpdateAdmin}>
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
        <button type="submit" className="update-button" disabled={loading}>
          {loading ? 'Updating...' : 'Update Admin'}
        </button>
      </form>
    </div>
  );
};

export default AdminUpdateForm;
