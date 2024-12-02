import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/UserDetails.css';

const UserDetails = () => {
  const [user, setUser] = useState(null); // Store logged-in user details
  const [preference, setPreference] = useState(null); // Store logged-in user's preference
  const [loading, setLoading] = useState(true); // Loading indicator
  const [error, setError] = useState(null); // Error state

  const userId = localStorage.getItem('user_id');
  const username = localStorage.getItem('username'); // Logged-in user's username
  const userType = localStorage.getItem('userType'); // Logged-in user's type
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Fetch user details
        const userResponse = await axios.get('http://localhost:8080/api/user/getAllUsers');
        const userData = userResponse.data.find((u) => String(u.user_id) === String(userId));
        setUser(userData);

        // Fetch preferences
        const prefResponse = await axios.get('http://localhost:8080/api/preferences/getAllPreferences');
        const userPreference = prefResponse.data.find(
          (pref) => pref.user && String(pref.user.user_id) === String(userId)
        );
        setPreference(userPreference || null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [userId]);


  const handleDeletePreference = async () => {
    if (!preference) return;

    const confirmDelete = window.confirm('Are you sure you want to delete this preference?');
    if (!confirmDelete) return;

    try {
      const preferenceId = preference.Preference_id || preference.preference_id;
      await axios.delete(`http://localhost:8080/api/preferences/deletePreferencesDetails/${preferenceId}`);
      setPreference(null);
      alert('Preference deleted successfully');
    } catch (err) {
      console.error('Error deleting preference:', err);
      alert('Failed to delete preference. Please try again.');
    }
  };

  const handleEditPreference = () => {
    if (preference) {
      const preferenceId = preference.Preference_id || preference.preference_id;
      navigate(`/update-pref/${preferenceId}`);
    }
  };

  const handleCreatePreference = () => {
    navigate('/create-pref');
  };

  if (loading) return <p>Loading details...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="user-details-container">
      <h2>{username ? `${username}'s Details` : 'Your Details'}</h2>
  
      {/* User Details */}
      {user ? (
        <div className="user-card">
          <p><span>Username:</span> {user.username}</p>
          <p><span>Email:</span> {user.email}</p>
          <Link to={`/update-user/${user.user_id}`}>
            <button className="update-button">Update Account</button>
          </Link>
        </div>
      ) : (
        <p>No user details found.</p>
      )}
  
      {/* Preference Details */}
      <h3>Preferences</h3>
      {preference ? (
        <div className="preference-card">
          <p><span>Favorite Movie:</span> {preference.recommendations}</p>
          <p><span>Favorite Genre:</span> {preference.preferredgenres}</p>
          <button className="delete" onClick={handleDeletePreference}>Delete Preference</button>
          <button className="edit" onClick={handleEditPreference}>Edit Preference</button>
        </div>
      ) : (
        <p>No preference found.</p>
      )}
  
      {/* Create Preference Button */}
      {!preference && (
        <button className="create" onClick={handleCreatePreference}>Create Preference</button>
      )}
    </div>
  );
  
};

export default UserDetails;
