import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/UserManagement.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading indicator state
  const [error, setError] = useState(null); // Error state
  const userType = localStorage.getItem('userType'); // 'user' or 'admin'
  const loggedInUserId = localStorage.getItem('user_id'); // Currently logged-in user's ID

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/user/getAllUsers');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Filter users if userType is 'user'
        const filteredUsers = userType === 'user'
          ? data.filter((user) => String(user.user_id) === String(loggedInUserId))
          : data;

        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load user list. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [userType, loggedInUserId]);

  const handleDeleteUser = async (user_id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

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

      setUsers(users.filter((user) => user.user_id !== user_id));
      alert(`User with ID ${user_id} deleted successfully`);
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user. Please try again.');
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="user-container">
      <h2>User Details</h2>
      <div className="user-list">
        {users.map((user) => (
          <div key={user.user_id} className="user-card">
            <p><span>User ID:</span> {user.user_id}</p>
            <p><span>Username:</span> {user.username}</p>
            <p><span>Email:</span> {user.email}</p>

            {userType === 'admin' && (
              <>
                <Link to={`/update-user/${user.user_id}`}>
                  <button className="update-button">Update</button>
                </Link>
                <button className="delete-button" onClick={() => handleDeleteUser(user.user_id)}>Delete</button>
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
