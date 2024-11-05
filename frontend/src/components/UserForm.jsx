// src/components/UserForm.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/UserManagement.css';
import axios from 'axios';

const UserForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/user/postUserRecord', {
        username,
        email,
        password,
      });
      alert(`User created: ${response.data.username}`);
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error creating user.');
    }
  };

  return (
    <div className="user-container">
      <h2>Create User</h2>
      <form onSubmit={handleCreateUser}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="create-button">Create User</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: '#3498db', textDecoration: 'none' }}>
          Login
        </Link>
      </p>
    </div>
  );
};

export default UserForm;
