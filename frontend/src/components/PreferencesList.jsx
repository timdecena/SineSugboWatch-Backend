import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/PreferencesList.css';


const PreferencesList = () => {
  const [preferences, setPreferences] = useState([]);
  const userId = localStorage.getItem('user_id');
  const userType = localStorage.getItem('userType'); // Get the user type
  const navigate = useNavigate();


  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/preferences/getAllPreferences');
        console.log('Fetched preferences data:', response.data);


        // Filter preferences based on user type
        let userPreferences;
        if (userType === 'user') {
          userPreferences = response.data.filter(preference =>
            String(preference.user.user_id) === String(userId)
          );
        } else {
          // Admin can view all preferences
          userPreferences = response.data;
        }


        setPreferences(userPreferences);
      } catch (error) {
        console.error('Error fetching preferences:', error);
      }
    };


    fetchPreferences();
  }, [userId, userType]);


  const handleDeletePreference = async (preferenceId) => {
    try {
      console.log('Attempting to delete preference with ID:', preferenceId);
      await axios.delete(`http://localhost:8080/api/preferences/deletePreferencesDetails/${preferenceId}`);
      console.log(`Deleted preference with ID: ${preferenceId}`);


      // Update the state to remove the deleted preference
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
      <h2>Preferences List</h2> {/* Updated title */}
      {preferences.length > 0 ? (
        preferences.map(preference => (
          <div key={preference.Preference_id || preference.preference_id} className="preference-card">
            <p><span>User:</span> {preference.user.username}</p> {/* Display preference owner's username */}
            <p><span>ID:</span> {preference.Preference_id || preference.preference_id}</p>
            <p><span>Personal recommendations:</span> {preference.recommendations}</p>
            <p><span>Favorite Genre:</span> {preference.preferredgenres}</p>


            {/* Edit and delete buttons are shown only if the logged-in user owns the preference */}
            {userType === 'user' && (
              <>
                <button onClick={() => handleDeletePreference(preference.Preference_id || preference.preference_id)}>Delete</button>
                <button onClick={() => handleEditPreference(preference.Preference_id || preference.preference_id)}>Edit Preference</button>
              </>
            )}
          </div>
        ))
      ) : (
        <p className="no-preference-message">No preferences found.</p>
      )}


      {/* Conditionally render the Add New Preference button based on user type */}
      {userType === 'user' && (
        <button onClick={handleCreatePreference}>Add New Preference</button>
      )}
    </div>
  );
};


export default PreferencesList;