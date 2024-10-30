// src/components/AdminList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../assets/AdminManagement.css';
//admin
const AdminList = () => {
  const [admins, setAdmins] = useState([]);

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

  const handleDeleteAdmin = async (admin_id) => {
    try {
      await axios.delete(`http://localhost:8080/api/admin/deleteAdmin/${admin_id}`);
      setAdmins(admins.filter((admin) => admin.admin_id !== admin_id));
      alert(`Admin with ID ${admin_id} deleted successfully`);
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
          <div key={admin.admin_id} className="admin-list-item">
            <p>Admin ID: {admin.admin_id}</p>
            <p>Username: {admin.username}</p>
            <Link to={`/update-admin/${admin.admin_id}`}>
              <button className="update-button">Update</button>
            </Link>
            <button onClick={() => handleDeleteAdmin(admin.admin_id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminList;