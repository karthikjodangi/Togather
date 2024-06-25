import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';

function Header({ isLoggedIn, setIsLoggedIn, userEmail }) {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (isLoggedIn && userEmail) {
      axios.get(`http://localhost:8080/api/user/${userEmail}`)
        .then(response => {
          setUserName(response.data.name);
        })
        .catch(error => {
          console.error('There was an error fetching the user name!', error);
        });
    }
  }, [isLoggedIn, userEmail]);

  const handleLogout = () => {
    // Perform logout actions, e.g., clear localStorage, reset state
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  return (
    <Navbar className="navbar" style={{ backgroundColor: '#006400' }}>
      <Container fluid>
        <Navbar.Brand href="/" style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>2Gather</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/myactivities" style={{ color: 'white' }}>My Activities</Nav.Link>
            <Nav.Link href="/buddies" style={{ color: 'white' }}>Buddies</Nav.Link>
            <Nav.Link href="/about" style={{ color: 'white' }}>About</Nav.Link>
          </Nav>
          <Form className="d-flex align-items-center">
          </Form>
          {isLoggedIn ? (
            <>
              <Button
                variant="primary"
                className="btn-lg px-2 me-md-2"
                style={{ backgroundColor: '#007BFF', color: 'white', fontSize: '16px' }}
              >
                <Nav.Link href="/createActivity" style={{ color: 'white' }}>Create Activity</Nav.Link>
              </Button>
              <Button
                variant="light"
                className="btn-lg px-2 me-2"
                style={{ backgroundColor: 'white', color: '#333', fontSize: '16px' }}
              >
                <Nav.Link href="/joinActivity" style={{ color: '#333' }}>Join Activity</Nav.Link>
              </Button>
              <Button
                variant="outline-success"
                style={{ color: 'white', fontSize: '16px' }}
                className="me-2"
              >
                <Nav.Link href="/myactivities" >{userName}</Nav.Link>

              </Button>
              <Button
                variant="outline-danger"
                onClick={handleLogout}
                style={{ fontSize: '16px' }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="primary"
                className="btn-lg px-2 me-md-2"
                style={{ backgroundColor: '#4169E1', color: 'white', fontSize: '16px' }}
              >
                <Nav.Link href="/createActivity" style={{ color: 'white' }}>Create Activity</Nav.Link>
              </Button>
              <Button
                variant="light"
                className="btn-lg px-2 me-2"
                style={{ backgroundColor: 'white', color: '#333', fontSize: '16px' }}
              >
                <Nav.Link href="/joinActivity" style={{ color: '#333' }}>Join Activity</Nav.Link>
              </Button>
              <Button variant="outline-success" style={{ fontSize: '16px' }}>
                <Nav.Link href="/login" style={{ color: 'white' }}>Register/Sign-in</Nav.Link>
              </Button>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Header;
