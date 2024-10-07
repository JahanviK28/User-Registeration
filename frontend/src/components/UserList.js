// frontend/src/components/UserList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users');
      setUsers(res.data.data);
    } catch (error) {
      setMessage('Error fetching users.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      const res = await axios.delete(`http://localhost:5000/api/users/${id}`);
      setMessage(res.data.message);
      fetchUsers(); // Refresh the list
    } catch (error) {
      setMessage('Error deleting user.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Registered Users</h2>
      {message && <p>{message}</p>}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Profile Picture</th>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Contact Info</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map(user => (
            <tr key={user._id}>
              <td>
                {user.profilePicture ? (
                  <img src={`http://localhost:5000/${user.profilePicture}`} alt="Profile" style={styles.image} />
                ) : (
                  'No Image'
                )}
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>{user.contactInfo}</td>
              <td>
                <Link to={`/update/${user._id}`} style={styles.link}>Update</Link>
                <button onClick={() => deleteUser(user._id)} style={styles.deleteButton}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  image: {
    width: '50px',
    height: '50px',
    objectFit: 'cover',
  },
  link: {
    marginRight: '10px',
    textDecoration: 'none',
    color: 'blue',
  },
  deleteButton: {
    padding: '5px 10px',
    backgroundColor: 'red',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
};

export default UserList;
