// frontend/src/components/UserList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPencilAlt, FaTrash, FaTimes, FaEyeSlash, FaEye } from 'react-icons/fa'; // Importing icons

import './UserList.css'; // Importing CSS for styling

const UserList = () => {
  // State to hold the list of users
  const [users, setUsers] = useState([]);

  // State for Delete Modal
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // State for Edit Modal
  const [editUserId, setEditUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    username: '',
    contactInfo: '',
    password: '',
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // State for Notifications
  const [notification, setNotification] = useState({
    message: '',
    type: '', // 'success' or 'error'
    visible: false,
  });

  // State for Password Visibility in Edit Modal
  const [showEditPassword, setShowEditPassword] = useState(false);

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  // eslint-disable-next-line no-use-before-define
  }, []);

  // Function to fetch users from the backend
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users`); // Adjust the API endpoint as needed
      setUsers(res.data.data); // Assuming the response structure { data: [...] }
    } catch (error) {
      console.error('Error fetching users:', error);
      showNotification('Failed to fetch users.', 'error');
    }
  };

  // Function to show notifications
  const showNotification = (message, type) => {
    setNotification({
      message,
      type,
      visible: true,
    });

    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  // Function to hide notifications manually
  const hideNotification = () => {
    setNotification((prev) => ({ ...prev, visible: false }));
  };

  // ----------------- Delete Functionality -----------------

  // Open Delete Modal
  const openDeleteModal = (userId) => {
    setDeleteUserId(userId);
    setDeleteConfirmationText('');
    setIsDeleteModalOpen(true);
  };

  // Close Delete Modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteUserId(null);
    setDeleteConfirmationText('');
  };

  // Handle Delete Confirmation
  const handleDelete = async () => {
    if (deleteConfirmationText === 'DELETE') {
      try {
        await axios.delete(`http://localhost:5000/api/users/${deleteUserId}`); // Adjust API endpoint as needed
        setUsers(users.filter((user) => user._id !== deleteUserId));
        showNotification('User deleted successfully.', 'success');
        closeDeleteModal();
      } catch (error) {
        console.error('Error deleting user:', error);
        showNotification('Failed to delete user.', 'error');
      }
    } else {
      showNotification('Please type DELETE to confirm.', 'error');
    }
  };

  // ----------------- Edit Functionality -----------------

  // Open Edit Modal
  const openEditModal = async (userId) => {
    setEditUserId(userId);
    setIsEditModalOpen(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/users/${userId}`); // Adjust API endpoint as needed
      const user = res.data.data; // Assuming response structure { data: { ... } }
      setEditFormData({
        name: user.name,
        email: user.email,
        username: user.username,
        contactInfo: user.contactInfo,
        password: '', // Do not pre-fill password for security
      });
    } catch (error) {
      console.error('Error fetching user details:', error);
      showNotification('Failed to fetch user details.', 'error');
      closeEditModal();
    }
  };

  // Close Edit Modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditUserId(null);
    setEditFormData({
      name: '',
      email: '',
      username: '',
      contactInfo: '',
      password: '',
    });
    setShowEditPassword(false);
  };

  // Handle Edit Form Changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle Edit Save
  const handleEditSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/users/${editUserId}`, editFormData); // Adjust API endpoint as needed
      // Update user in the local state
      setUsers(
        users.map((user) =>
          user._id === editUserId ? { ...user, ...editFormData } : user
        )
      );
      showNotification('User updated successfully.', 'success');
      closeEditModal();
    } catch (error) {
      console.error('Error updating user:', error);
      showNotification('Failed to update user.', 'error');
    }
  };

  return (
    <div className="userlist-container">
      <h2>User List</h2>
      <table className="userlist-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>contactInfo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.contactInfo}</td>
                <td>
                  <button
                    className="action-button edit-button"
                    onClick={() => openEditModal(user._id)}
                    title="Edit User"
                  >
                    <FaPencilAlt />
                  </button>
                  <button
                    className="action-button delete-button"
                    onClick={() => openDeleteModal(user._id)}
                    title="Delete User"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-users">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Delete</h3>
            <p>
              To delete this user, please type <strong>DELETE</strong> below:
            </p>
            <input
              type="text"
              value={deleteConfirmationText}
              onChange={(e) => setDeleteConfirmationText(e.target.value)}
              placeholder="Type DELETE to confirm"
              className="modal-input"
            />
            <div className="modal-buttons">
              <button className="modal-button cancel-button" onClick={closeDeleteModal}>
                Cancel
              </button>
              <button
                className="modal-button confirm-button"
                onClick={handleDelete}
                disabled={deleteConfirmationText !== 'DELETE'}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit User</h3>
            <form className="edit-form">
              <input
                type="text"
                name="name"
                value={editFormData.name}
                onChange={handleEditChange}
                placeholder="Full Name"
                className="modal-input"
                autoComplete="name"
              />
              <input
                type="email"
                name="email"
                value={editFormData.email}
                onChange={handleEditChange}
                placeholder="Email ID"
                className="modal-input"
                autoComplete="email"
              />
              <input
                type="text"
                name="username"
                value={editFormData.username}
                onChange={handleEditChange}
                placeholder="Username"
                className="modal-input"
                autoComplete="username"
              />
              <input
                type="text"
                name="contactInfo"
                value={editFormData.contactInfo}
                onChange={handleEditChange}
                placeholder="Contact Info"
                className="modal-input"
                autoComplete="tel"
              />
              <div className="password-container">
                <input
                  type={showEditPassword ? 'text' : 'password'}
                  name="password"
                  value={editFormData.password}
                  onChange={handleEditChange}
                  placeholder="New Password"
                  className="modal-input password-input"
                />
                <span
                  onClick={() => setShowEditPassword(!showEditPassword)}
                  className="eye-icon"
                >
                  {showEditPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </form>
            <div className="modal-buttons">
              <button className="modal-button cancel-button" onClick={closeEditModal}>
                Cancel
              </button>
              <button
                className="modal-button save-button"
                onClick={handleEditSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Popup */}
      {notification.visible && (
        <div className={`notification-popup ${notification.type}`}>
          <span>{notification.message}</span>
          <FaTimes className="notification-close-icon" onClick={hideNotification} />
        </div>
      )}
    </div>
  );
};

export default UserList;
