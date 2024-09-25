import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Import the CSS file

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/users/register', {
      username,
      password,
    });
    window.location.href = '/';
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
      
      {/* Register Form */}
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input-field"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="input-field"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
