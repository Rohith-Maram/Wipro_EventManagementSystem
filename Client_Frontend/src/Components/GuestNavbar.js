import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const GuestNavbar = () => {

  return (
    <Navbar expand="lg" className="py-2" style={{ background: 'linear-gradient(90deg, #4568dc, #3498db)' }}>
      <Container>
        <Navbar.Brand href="/" className="fs-3 fw-bold" style={{ color: '#ffeb3b', fontFamily: 'cursive', cursor:'pointer' }}>
          Event Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link href="/login" className="text-white mx-2">Login</Nav.Link>
            <Nav.Link href="/register" className="text-white mx-2">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default GuestNavbar;
