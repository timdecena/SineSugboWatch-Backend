import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/PreferencesList.css'; 

const PreferencesList = () => {
  const [preferences, setPreferences] = useState([]); s
  const userId = localStorage.getItem('user_id');
  const username = localStorage.getItem('username'); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/preferences/getAllPreferences');
        console.log('Fetched preferences data:', response.data);

        const userPreferences = response.data.filter(
          (pref) => pref.user && String(pref.user.user_id) === String(userId)
        );

        console.log('User preferences found:', userPreferences);
        setPreferences(userPreferences);
      } catch (error) {
        console.error('Error fetching preferences:', error);
      }
    };

    fetchPreferences();
  }, [userId]);

  const handleDeletePreference = async (preferenceId) => {
    try {
      console.log('Attempting to delete preference with ID:', preferenceId);
      await axios.delete(`http://localhost:8080/api/preferences/deletePreferencesDetails/${preferenceId}`);
      console.log(`Deleted preference with ID: ${preferenceId}`);
      
      // Remove the deleted preference from state
      setPreferences(preferences.filter(pref => pref.Preference_id !== preferenceId));
      alert('Preference deleted successfully');
    } catch (error) {
      console.error('Error deleting preference:', error.response || error);
      alert('Failed to delete preference. Please check the console for details.');
    }
  };

  const handleEditPreference = (preferenceId) => {
    navigate(`/update-pref/${preferenceId}`);
  };

  const handleCreatePreference = () => {
    navigate('/create-pref');
  };

  return (
    <div className="container">
      <h2>{username ? `${username}'s Preferences` : 'Your Preferences'}</h2>
      {preferences.length > 0 ? (
        preferences.map(preference => (
          <div key={preference.Preference_id || preference.preference_id} className="preference-card">
            <p><span>ID:</span> {preference.Preference_id || preference.preference_id}</p>
            <p><span>Your recommendations:</span> {preference.recommendations}</p> 
            <p><span>Favorite Genre:</span> {preference.preferredgenres}</p>
            <button onClick={() => handleDeletePreference(preference.Preference_id || preference.preference_id)}>Delete</button>
            <button onClick={() => handleEditPreference(preference.Preference_id || preference.preference_id)}>Edit Preference</button>
          </div>
        ))
      ) : (
        <p className="no-preference-message">No preferences found.</p>
      )}
      <button onClick={handleCreatePreference}>Add New Preference</button>
    </div>
  );
};

export default PreferencesList;
