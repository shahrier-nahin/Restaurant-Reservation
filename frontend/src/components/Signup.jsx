import React, { useState } from 'react';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:4000/api/v1/authentication/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    // Handle signup response (replace with actual logic based on your backend)
    if (response.ok) {
      console.log('Signup successful!');
      toast.success('Signup successful!');
      
      navigate('/');
      // Redirect or display success message
    } else {
      console.error('Signup failed!');
      toast.error(data.message || 'Signup failed!');
      // Display error message to user
    }
  };

  return (
    <section className="reservation" id="reservation">
  <div className="container">
    <div className="banner"><img src="/Restaurant.png" alt="res" /></div>
    <div className="banner">
      <div className="reservation_form_box"> 
        <h1>Login</h1>
        <p></p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Email:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p></p>
          <button type="submit">Signup</button>
         
        </form>
      </div>
    </div>
  </div>
</section>
  );
};

export default Signup;
