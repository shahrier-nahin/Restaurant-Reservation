import React, { useState } from 'react';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


const Login = (props) => {
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

    if (response.ok) {
      console.log('Login successful!');
      toast.success('Login successful!'); // Use toast for success message
      navigate('/home'); // Navigate to home page on success
    } else {
      console.error('Login failed!');
      toast.error(data.message || 'Login failed!'); // Use toast for error message with data.message if available
      navigate('/home');
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
          <button type="submit">Login</button>
         
         <p></p>
         
          <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
          
        </form>
      </div>
    </div>
  </div>
</section>

  );
};

export default Login;
