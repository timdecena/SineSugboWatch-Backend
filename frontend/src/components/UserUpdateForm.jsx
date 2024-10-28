// src/components/UserUpdateForm.jsx

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/UserManagement.css';
import axios from 'axios';

const UserUpdateForm = () => {
  const { id } = useParams();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/api/user/putUserDetails?id=${id}`, {
        username,
        email,
        password,
      });
      alert(`User updated: ${response.data.username}`);
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Error updating user.');
    }
  };

  return (
    <div className="user-container">
      <h2>Update User</h2>
      <form onSubmit={handleUpdateUser}>
        <input
          type="text"
          placeholder="New Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="New Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default UserUpdateForm;
