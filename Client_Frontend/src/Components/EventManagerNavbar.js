import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const EventManagerNavbar = ({ auth, setAuth }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    setAuth({ isAuthenticated: false, role: '' }); // Update state to reflect logout
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="py-2" style={{ background: 'linear-gradient(90deg, #2c3e50, #4568dc, #3498db)' }}>
      <Container>
        <Navbar.Brand onClick={() => navigate('/home')} className="fs-3 fw-bold" style={{ color: '#ffeb3b', fontFamily: 'cursive', cursor: 'pointer' }}>
          Event Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link onClick={() => navigate('/home')} className="text-white mx-2">Home</Nav.Link>

            {auth.isAuthenticated && auth.role === 'Admin' && (
              <Nav.Link onClick={() => navigate('/create-event')} className="text-white mx-2">Create Event</Nav.Link>
            )}

            {auth.isAuthenticated && (
              <Button variant="warning" className="mx-2" onClick={handleLogout}>Logout</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default EventManagerNavbar;
