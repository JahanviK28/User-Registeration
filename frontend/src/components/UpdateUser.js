// frontend/src/components/UpdateUser.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateUser = () => {
  const { id } = useParams(); // Get user ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    contactInfo: '',
    profilePicture: null,
  });

  const [message, setMessage] = useState('');

  const { name, email, username, contactInfo, profilePicture } = formData;

  useEffect(() => {
    // Fetch user data
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users');
        const user = res.data.find(u => u._id === id);
        if (user) {
          setFormData({
            name: user.name,
            email: user.email,
            username: user.username,
            contactInfo: user.contactInfo,
            profilePicture: null, // Reset to null; allow uploading new image
          });
        } else {
          setMessage('User not found');
        }
      } catch (error) {
        setMessage('Error fetching user data');
      }
    };

    fetchUser();
  }, [id]);

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
    if (!name || !email || !username || !contactInfo) {
      setMessage('Please fill in all required fields.');
      return;
    }

    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('username', username);
    data.append('contactInfo', contactInfo);
    if (profilePicture) {
      data.append('profilePicture', profilePicture);
    }

    try {
      const res = await axios.put(`http://localhost:5000/api/users/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(res.data.message);
      navigate('/users'); // Redirect to user list
    } catch (error) {
      setMessage(error.response?.data?.message || 'Update failed.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Update User</h2>
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
          type="file"
          name="profilePicture"
          accept="image/*"
          onChange={onChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Update</button>
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

export default UpdateUser;
