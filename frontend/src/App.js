// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import UserList from './components/UserList';
import UpdateUser from './components/UpdateUser';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={styles.container}>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/update/:id" element={<UpdateUser />} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  container: {
    padding: '20px',
  },
};

export default App;
