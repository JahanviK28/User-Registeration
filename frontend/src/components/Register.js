// frontend/src/components/Register.js

import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    contactInfo: '',
    password: '',
    profilePicture: null,
  });

  const [message, setMessage] = useState('');

  const { name, email, username, contactInfo, profilePicture, password } = formData;

  const onChange = e => {
    if (e.target.name === 'profilePicture') {
      setFormData({ ...formData, profilePicture: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async e => {
    e.preventDefault();

    // Basic form validation
    if (!name || !email || !username || !contactInfo || !password) {
      setMessage('Please fill in all required fields.');
      return;
    }

    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('username', username);
    data.append('contactInfo', contactInfo);
    data.append('password', password)
    if (profilePicture) {
      data.append('profilePicture', profilePicture);
    }

    try {
      const res = await axios.post('https://5942-43-250-156-233.ngrok-free.app/api/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(res.data.message);
      setFormData({
        name: '',
        email: '',
        username: '',
        contactInfo: '',
        profilePicture: null,
      });
    } catch (error) {
      console.error(error)
      setMessage(error.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register User</h2>
      {message && <p>{message}</p>}
      <form onSubmit={onSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={name}
          onChange={onChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email ID"
          value={email}
          onChange={onChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={onChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="contactInfo"
          placeholder="Contact Info"
          value={contactInfo}
          onChange={onChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          required
          style={styles.input}
        />
        <input
          type="file"
          name="profilePicture"
          accept="image/*"
          onChange={onChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Register</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '500px',
    margin: '0 auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    marginBottom: '10px',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Register;
