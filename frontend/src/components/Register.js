// frontend/src/components/Register.js

import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa'; // Importing eye and close icons
import axios from 'axios';
import './Register.css'; // Importing CSS for styling

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    contactInfo: '',
    password: '',
    profilePicture: null,
  });

  const [notification, setNotification] = useState({
    message: '',
    type: '', // 'success' or 'error'
    visible: false,
  });

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [isSubmitting, setIsSubmitting] = useState(false); // State to handle form submission

  const { name, email, username, contactInfo, profilePicture, password } = formData;

  // Handle input changes
  const onChange = (e) => {
    if (e.target.name === 'profilePicture') {
      setFormData({ ...formData, profilePicture: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!name || !email || !username || !contactInfo || !password) {
      showNotification('Please fill in all required fields.', 'error');
      return;
    }

    setIsSubmitting(true);

    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('username', username);
    data.append('contactInfo', contactInfo);
    data.append('password', password);
    if (profilePicture) {
      data.append('profilePicture', profilePicture);
    }

    try {
      const res = await axios.post('http://localhost:5000/api/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      showNotification(res.data.message || 'Registration successful!', 'success');

      // Reset form fields
      setFormData({
        name: '',
        email: '',
        username: '',
        contactInfo: '',
        password: '',
        profilePicture: null,
      });
    } catch (error) {
      console.error('Registration Error:', error);
      const errorMessage =
        error.response?.data?.message || 'Registration failed. Please try again.';
      showNotification(errorMessage, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show notification
  const showNotification = (message, type) => {
    setNotification({
      message,
      type,
      visible: true,
    });

    // Automatically hide notification after 3 seconds
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  // Hide notification manually
  const hideNotification = () => {
    setNotification((prev) => ({ ...prev, visible: false }));
  };

  // Ensure form is reset when component mounts
  useEffect(() => {
    setFormData({
      name: '',
      email: '',
      username: '',
      contactInfo: '',
      password: '',
      profilePicture: null,
    });
    setNotification({
      message: '',
      type: '',
      visible: false,
    });
    setShowPassword(false);
  }, []);

  return (
    <div className="register-container">
      <h2>Register User</h2>

      {/* Notification Popup */}
      {notification.visible && (
        <div className={`notification ${notification.type}`}>
          <span>{notification.message}</span>
          <FaTimes className="close-icon" onClick={hideNotification} />
        </div>
      )}

      <form onSubmit={onSubmit} className="register-form" autoComplete="off">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={name}
          onChange={onChange}
          required
          className="register-input"
          autoComplete="name"
        />
        <input
          type="email"
          name="email"
          placeholder="Email ID"
          value={email}
          onChange={onChange}
          required
          className="register-input"
          autoComplete="email"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={onChange}
          required
          className="register-input"
          autoComplete="username"
        />
        <input
          type="text"
          name="contactInfo"
          placeholder="Contact Info"
          value={contactInfo}
          onChange={onChange}
          required
          className="register-input"
          autoComplete="tel"
        />

        {/* Password Field with Toggle */}
        <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={password}
            onChange={onChange}
            required
            className="register-input password-input"
            autoComplete="new-password" // Prevents autofill
          />
          <span onClick={togglePasswordVisibility} className="eye-icon">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <input
          type="file"
          name="profilePicture"
          accept="image/*"
          onChange={onChange}
          className="register-input file-input"
          autoComplete="off" // Prevents autofill
        />
        <button type="submit" className="register-button" disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

// Export the component
export default Register;
