import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/PreferencesList.css'; // Adjust the path as needed

const PreferencesList = () => {
  const [preference, setPreference] = useState(null);
  const userId = localStorage.getItem('user_id');
  const username = localStorage.getItem('username'); // Retrieve username from localStorage
  const navigate = useNavigate(); // Use useNavigate for navigation

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/preferences/getAllPreferences');
        console.log('Fetched preferences data:', response.data);

        const userPreference = response.data.find(
          (pref) => pref.user && String(pref.user.user_id) === String(userId)
        );

        console.log('User preference found:', userPreference);
        setPreference(userPreference || null);
      } catch (error) {
        console.error('Error fetching preferences:', error);
      }
    };

    fetchPreferences();
  }, [userId]);

  const handleDeletePreference = async () => {
    if (!preference) return;

    const confirmDelete = window.confirm('Are you sure you want to delete this preference?');
    if (!confirmDelete) return;

    try {
      console.log('Attempting to delete preference with ID:', preference.Preference_id || preference.preference_id);
      const preferenceId = preference.Preference_id || preference.preference_id;

      await axios.delete(`http://localhost:8080/api/preferences/deletePreferencesDetails/${preferenceId}`);
      console.log(`Deleted preference with ID: ${preferenceId}`);
      
      setPreference(null);
      alert('Preference deleted successfully');
    } catch (error) {
      console.error('Error deleting preference:', error.response || error);
      alert('Failed to delete preference. Please check the console for details.');
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

  return (
    <div className="container">
      <h2>{username ? `${username}'s Preference` : 'Your Preference'}</h2>
      {preference ? (
        <div className="preference-card">
          <p><span>ID:</span> {preference.Preference_id || preference.preference_id}</p>
          <p><span>Your recommendations:</span> {preference.recommendations}</p> 
          <p><span>Favorite Genre:</span> {preference.preferredgenres}</p>
          <button className="delete" onClick={handleDeletePreference}>Delete</button>
          <button className="edit" onClick={handleEditPreference}>Edit your Preference</button>
        </div>
      ) : (
        <p className="no-preference-message">No preference found.</p>
      )}
      <button className="create" onClick={handleCreatePreference}>Create Preference</button>
    </div>
  );
};

export default PreferencesList;
