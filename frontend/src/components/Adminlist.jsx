import React, { useEffect, useState } from 'react';
import '../assets/AdminManagement.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const userType = localStorage.getItem('userType'); // Get user type ('user' or 'admin') from localStorage

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/getAllAdmins');
        setAdmins(response.data);
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    };
    fetchAdmins();
  }, []);

  const handleDeleteAdmin = async (adminId) => {
    try {
      await axios.delete(`http://localhost:8080/api/admin/deleteAdminDetails/${adminId}`);
      setAdmins(admins.filter((admin) => admin.adminId !== adminId));
      alert(`Admin with ID ${adminId} deleted successfully`);
    } catch (error) {
      console.error('Error deleting admin:', error);
      alert('Failed to delete admin. Please try again.');
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin List</h2>
      <div className="admin-list">
        {admins.map((admin) => (
          <div key={admin.adminId} className="admin-list-item">
            <p>Admin ID: {admin.adminId}</p>
            <p>Username: {admin.username}</p>
            <p>Email: {admin.email}</p>
            
            
            {userType === 'admin' && (
              <>
                <Link to={`/update-admin/${admin.adminId}`}>
                  <button className="update-button">Update</button>
                </Link>
                <button onClick={() => handleDeleteAdmin(admin.adminId)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminList;
