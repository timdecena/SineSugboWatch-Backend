// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user'); // Default to user
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Set the API endpoint based on user type
    const loginEndpoint = userType === 'admin' 
      ? 'http://localhost:8080/api/admin/login' 
      : 'http://localhost:8080/api/user/login';

    fetch(loginEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Invalid username or password');
        }
        return response.json();
      })
      .then(data => {
        alert('Login successful!');
        
       
        localStorage.setItem('username', username); 
        localStorage.setItem('userType', userType); 

        
        if (data.user_id) {
          localStorage.setItem('user_id', data.user_id); 
        }

        navigate(userType === 'admin' ? '/admins' : '/'); 
      })
      .catch(error => {
        alert(error.message);
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="user-type-selection">
          <label>
            <input
              type="radio"
              value="user"
              checked={userType === 'user'}
              onChange={(e) => setUserType(e.target.value)}
            />
            User
          </label>
          <label>
            <input
              type="radio"
              value="admin"
              checked={userType === 'admin'}
              onChange={(e) => setUserType(e.target.value)}
            />
            Admin 
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;