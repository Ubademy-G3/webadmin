import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavLink from 'react-bootstrap/NavLink';

export default function NavBar() {
  return (
    <Navbar>
      <Navbar.Brand>
        <a href="/">React-Bootstrap</a>
      </Navbar.Brand>
      <Nav>
        <NavLink eventKey={1} href="/">Home</NavLink>
        <NavLink eventKey={2} href="/login">Login</NavLink>
      </Nav>
    </Navbar>
  );
}
