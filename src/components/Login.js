import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import the CSS file

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for error handling

  // Default credentials
  const defaultUsername = 'bca';
  const defaultPassword = 'ctis';

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for default credentials
    if (username === defaultUsername && password === defaultPassword) {
      // Simulate successful login
      localStorage.setItem('token', 'dummy-token'); // Store a dummy token

      onLogin(username); // Pass the username to App.js

      // Redirect to dashboard
      window.location.href = '/dashboard';
    } else {
      // Perform the actual login request
      try {
        const { data } = await axios.post('http://localhost:5000/api/users/login', {
          username,
          password,
        });

        // Store the token in local storage
        localStorage.setItem('token', data.token);

        // Call onLogin with the username
        onLogin(username); // Pass the username to App.js

        // Redirect to dashboard
        window.location.href = '/dashboard';
      } catch (err) {
        setError('Invalid credentials. Please try again.'); // Set error message
        console.error(err);
      }
    }
  };

  return (
    <div className="container">
      {/* Voting System Header */}
      <div className="header">Voting System</div>
      
      {/* Indian Flag Color Bar */}
      <div className="flag-colors">
        <div className="flag-color saffron"></div>
        <div className="flag-color white"></div>
        <div className="flag-color green"></div>
      </div>
      
      {/* Login Form */}
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input-field"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required // Make the input required
        />
        <input
          type="password"
          className="input-field"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required // Make the input required
        />
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      </form>
    </div>
  );
};

export default Login;