import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
// import Cart from './Cart';
import { useState } from 'react';

const NavBa = () => {

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const user = localStorage.getItem('user')
  const navigate = useNavigate()

  const logout = ()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
      <>
      <Navbar className='navbar-all'  variant="dark">
        <Container>
          <Navbar.Brand className='navbar-title' as={ Link } to="/">E-commerce <i className='bx bxs-shopping-bags navbar-bags'></i></Navbar.Brand>
        </Container>
          <Nav className="me-auto content-detail-navbar">
            <section className='link-login'  >
            {
              user ? <Nav.Link onClick={ logout }>Logout</Nav.Link>  : <Nav.Link as={Link} to="/login" className='login-navbar' ><i className='bx bx-user icon-user-navbar'></i></Nav.Link>
            }
               
            </section>
            <section className='link-purchase'>
              <Nav.Link className='purchase-navbar' as={Link}  to="/purchase"  ><i className="fa-solid fa-box-archive purchase-icon"></i></Nav.Link>
            </section>
            <section className='link-car' > 
              <Nav.Link  className='car-navbar' onClick={handleShow} ><i className='bx bxs-cart icon-car-navbar'></i></Nav.Link>
            </section>
          
          </Nav>
          {
            user && `Welcome ${user}`
          }
      </Navbar>
      {/* <Cart show={show} handleClose={handleClose} ></Cart> */}

            <section className='section-navbar'>

            </section>

      </>
  )
}

export default NavBa;