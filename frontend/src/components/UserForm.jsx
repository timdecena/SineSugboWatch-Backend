// src/components/UserForm.jsx

import React, { useState } from 'react';
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
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default UserForm;