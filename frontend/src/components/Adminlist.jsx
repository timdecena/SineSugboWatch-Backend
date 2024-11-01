// src/components/AdminList.jsx
import React, { useEffect, useState } from 'react';
import '../assets/AdminManagement.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

  const handleDeleteAdmin = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/admin/deleteAdminDetails/${id}`);
      setAdmins(admins.filter((admin) => admin.id !== id));
      alert(`Admin with ID ${id} deleted successfully`);
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
          <div key={admin.id} className="admin-list-item">
            <p>Admin ID: {admin.id}</p>
            <p>Username: {admin.username}</p>
            <p>Email: {admin.email}</p>
            <Link to={`/update-admin/${admin.id}`}>
              <button className="update-button">Update</button>
            </Link>
            <button onClick={() => handleDeleteAdmin(admin.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminList;
