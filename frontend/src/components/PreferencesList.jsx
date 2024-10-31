import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PreferencesList = () => {
  const [preference, setPreference] = useState(null);
  const userId = localStorage.getItem('user_id');

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
      const preferenceId = preference.Preference_id || preference.preference_id; // Adjust field if necessary

      await axios.delete(`http://localhost:8080/api/preferences/deletePreferencesDetails/${preferenceId}`);
      console.log(`Deleted preference with ID: ${preferenceId}`);
      
      setPreference(null);
      alert('Preference deleted successfully');
    } catch (error) {
      console.error('Error deleting preference:', error.response || error);
      alert('Failed to delete preference. Please check the console for details.');
    }
  };

  return (
    <div>
      <h2>Your Preference</h2>
      {preference ? (
        <div>
          <p>{preference.recommendations} - {preference.preferredgenres}</p>
          <button onClick={handleDeletePreference}>Delete</button>
        </div>
      ) : (
        <p>No preference found.</p>
      )}
    </div>
  );
};

export default PreferencesList;
