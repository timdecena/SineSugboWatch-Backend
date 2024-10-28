// src/components/UserList.jsx

import React, { useEffect, useState } from 'react';
import '../assets/UserManagement.css';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/user/getAllUsers');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/user/deleteUserDetails/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      alert(`User ${id} deleted successfully`);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="user-container">
      <h2>User List</h2>
      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-list-item">
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
