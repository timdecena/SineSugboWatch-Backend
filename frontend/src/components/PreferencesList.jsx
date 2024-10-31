import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const PreferencesList = () => {
  const [preference, setPreference] = useState(null);
  const userId = localStorage.getItem('user_id');
  const navigate = useNavigate(); // Initialize useNavigate

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

  const handleUpdatePreference = () => {
    if (preference) {
      const preferenceId = preference.Preference_id || preference.preference_id;
      // Navigate to the update form with the preference ID
      navigate(`/update-pref/${preferenceId}`);
    }
  };

  return (
    <div>
      <h2>Your Preference</h2>
      {preference ? (
        <div>
          <p>ID: {preference.Preference_id || preference.preference_id}</p>
          <p>{preference.recommendations} - {preference.preferredgenres}</p>
          <button onClick={handleDeletePreference}>Delete</button>
          <button onClick={handleUpdatePreference}>Update</button> {/* Update button added here */}
        </div>
      ) : (
        <p>No preference found.</p>
      )}
    </div>
  );
};

export default PreferencesList;
