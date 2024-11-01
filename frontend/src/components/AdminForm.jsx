// src/components/AdminForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import '../assets/AdminManagement.css';

const AdminForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/admin/postAdminRecord', {
        username,
        email,
        password,
      });
      alert(`Admin created: ${response.data.username}`);
    } catch (error) {
      console.error('Error creating admin:', error);
      alert('Error creating admin.');
    }
  };

  return (
    <div className="admin-container">
      <h2>Create Admin</h2>
      <form onSubmit={handleCreateAdmin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Create Admin</button>
      </form>
    </div>
  );
};

export default AdminForm;