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

  const handleDeleteUser = async (user_id) => {
    try {
      await axios.delete(`http://localhost:8080/api/user/deleteUserDetails/${user_id}`);
      setUsers(users.filter((user) => user.user_id !== user_id));
      alert(`User with ID ${user_id} deleted successfully`);
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user. Please try again.');
    }
  };

  return (
    <div className="user-container">
      <h2>User List</h2>
      <div className="user-list">
        {users.map((user) => (
          <div key={user.user_id} className="user-list-item">
            <p>User ID: {user.user_id}</p>  {/* Display User ID */}
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <button onClick={() => handleDeleteUser(user.user_id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
