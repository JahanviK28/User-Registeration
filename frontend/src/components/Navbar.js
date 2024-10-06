// frontend/src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>User Registeration App</h2>
      <div>
        <Link to="/" style={styles.link}>Register</Link>
        <Link to="/users" style={styles.link}>Users</Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    margin: 0,
  },
  link: {
    marginLeft: '15px',
    color: '#fff',
    textDecoration: 'none',
  },
};

export default Navbar;
