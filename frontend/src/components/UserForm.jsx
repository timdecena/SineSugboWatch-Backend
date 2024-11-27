import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/UserManagement.css';
import axios from 'axios';

const UserForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateUsername = async () => {
    try {
      await axios.get(`http://localhost:8080/api/user/checkUsername?username=${username}`);
      setUsernameError(''); // Clear any previous error if validation passes
    } catch (error) {
      if (error.response && typeof error.response.data === 'string') {
        setUsernameError(error.response.data); // Set the backend error message
      } else {
        setUsernameError('Username already exists.'); // Fallback for unexpected errors
      }
    }
  };
  
  const validateEmail = async () => {
    try {
      await axios.get(`http://localhost:8080/api/user/checkEmail?email=${email}`);
      setEmailError(''); // Clear any previous error if validation passes
    } catch (error) {
      if (error.response && typeof error.response.data === 'string') {
        setEmailError(error.response.data); // Set the backend error message
      } else {
        setEmailError('Email already in use.'); // Fallback for unexpected errors
      }
    }
  };  

  // Function to handle form submission and user creation
  const handleCreateUser = async (e) => {
    e.preventDefault();

    // Password validation
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
      return;
    } else {
      setPasswordError('');
    }

    // Validate username and email before submitting the form
    await validateUsername();
    await validateEmail();

    if (usernameError || emailError || passwordError) {
      return; // Don't proceed if there's an error
    }

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
          onBlur={validateUsername} // Validate on blur
          required
        />
        {usernameError && <p className="error-message">{usernameError}</p>}
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={validateEmail} // Validate on blur
          required
        />
        {emailError && <p className="error-message">{emailError}</p>}
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {passwordError && <p className="error-message">{passwordError}</p>}
        
        <button type="submit" className="create-button">
          Create User
        </button>
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
