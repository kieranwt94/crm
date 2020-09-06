import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';

export default () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="dark" dark fixed="fixed" expand="md" className="navbar-fixed">
      <Link to="/" className="navbar-brand">
        <img src="https://s3-eu-west-1.amazonaws.com/crm.bluesquareoffices.com/bso-square.png" alt="Blue Square Offices logo" />
        <span className="navbar-brand__name">CRM</span>
      </Link>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem> 
            <Link to="/" className="nav-link">Dashboard</Link>
          </NavItem>
          <NavItem>
            <Link to="/brands" className="nav-link">Brands</Link>
          </NavItem>
          <NavItem>
            <Link to="/customers" className="nav-link">Customers</Link>
          </NavItem>
          <NavItem>
            <Link to="/services" className="nav-link">Services</Link>
          </NavItem>
          <NavItem>
            <Link to="/orders" className="nav-link">Orders</Link>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}
