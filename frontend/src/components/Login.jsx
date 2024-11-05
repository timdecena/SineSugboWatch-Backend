// Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../assets/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user'); // Default to user
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
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
          required
        />
        
        <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'} // Toggle input type based on showPassword state
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
          >
            {showPassword ? '🛇' : '👁️'}
          </button>
        </div>
        
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
      
      <p>
        Don't have an account? 
        <Link to="/create-user" style={{ marginLeft: '5px', textDecoration: 'underline', color: '#007BFF' }}>
          Create Account
        </Link>
      </p>
    </div>
  );
};

export default Login;
