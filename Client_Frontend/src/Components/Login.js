import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';

const Login = ({ setAuth }) => {
  const [user, setUser] = useState({ username: '', passwordHash: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    //Debugging
    console.log("Entered Username:", user.username);
    console.log("Entered Password:", user.passwordHash);

    try {
      const response = await axios.post('https://localhost:7013/api/Auth/login', user);

      console.log("API Response:", response); // Debugging full response
      console.log("Token Received:", response.data.token);


      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      
      setAuth({ isAuthenticated: true, role: response.data.role });
      
      alert('Login successful!');
      navigate(response.data.role === 'Admin' ? '/home' : '/user/home');
    } catch (err) {
        console.error("Login Error:", err);

        if (err.response) {
            setError(err.response.data || 'Invalid username or password.');
          } else {
            setError('Something went wrong. Please try again.');
          }
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card className="shadow p-4" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name="username" onChange={handleChange} required autoComplete='off'/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="passwordHash" onChange={handleChange} required />
          </Form.Group>
          <Button type="submit" className="w-100">Login</Button>
        </Form>
        <p className="mt-3 text-center">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </Card>
    </Container>
  );
};

export default Login;
