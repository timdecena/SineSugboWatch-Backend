import React, { useEffect, useState } from 'react';
import '../assets/UserManagement.css';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const userType = localStorage.getItem('userType'); // 'user' or 'admin'
  const loggedInUserId = localStorage.getItem('user_id'); // Currently logged-in user's ID

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/user/getAllUsers');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (user_id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/user/deleteUserDetails/${user_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // If successful, update the state
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
            <p>User ID: {user.user_id}</p>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>

            {/* Conditional rendering for update button and delete button */}
            {userType === 'admin' && (
              <>
                <Link to={`/update-user/${user.user_id}`}>
                  <button className="update-button">Update</button>
                </Link>
                <button onClick={() => handleDeleteUser(user.user_id)}>Delete</button>
              </>
            )}
            {userType === 'user' && loggedInUserId === String(user.user_id) && (
              <Link to={`/update-user/${user.user_id}`}>
                <button className="update-button">Update</button>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
