import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';

const Register = () => {
  const [user, setUser] = useState({ username: '', passwordHash: '', role: 'User' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('https://localhost:7013/api/Auth/register', user);
      alert('Registration successful! You can now log in.');
      navigate('/login');
    } catch (err) {
      setError('Failed to register. User might already exist.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card className="shadow p-4" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">Register</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name="username" onChange={handleChange} required autoComplete='off' />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="passwordHash" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select name="role" onChange={handleChange}>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </Form.Select>
          </Form.Group>
          <Button type="submit" className="w-100">Register</Button>
        </Form>
        <p className="mt-3 text-center">
          Already have an account? <a href="/login">Login</a>
        </p>
      </Card>
    </Container>
  );
};

export default Register;
