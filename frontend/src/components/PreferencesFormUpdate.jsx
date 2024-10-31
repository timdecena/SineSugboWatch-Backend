// src/components/PreferencesFormUpdate.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PreferencesFormUpdate = ({ preferenceId }) => {
  const [recommendations, setRecommendations] = useState('');
  const [preferredGenres, setPreferredGenres] = useState('');
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    const fetchPreference = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/preferences/${preferenceId}`);
        const preference = response.data;

        setRecommendations(preference.recommendations);
        setPreferredGenres(preference.preferredgenres);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching preference:', error);
        alert('Error fetching preference details.');
        setLoading(false); // Ensure loading stops on error
      }
    };

    if (preferenceId) {
      fetchPreference();
    } else {
      alert("Invalid preference ID provided.");
      setLoading(false); // Stop loading if no valid ID
    }
  }, [preferenceId]);

  const handleUpdatePreference = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:8080/api/preferences/putPreferencesDetails?id=${preferenceId}`,
        {
          recommendations,
          preferredgenres: preferredGenres,
          user: { user_id: userId },
        }
      );
      alert("Preference updated successfully!");
    } catch (error) {
      console.error('Error updating preference:', error);
      alert('Error updating preference.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Update Preferences</h2>
      <form onSubmit={handleUpdatePreference}>
        <input
          type="text"
          placeholder="Recommendations"
          value={recommendations}
          onChange={(e) => setRecommendations(e.target.value)}
        />
        <input
          type="text"
          placeholder="Preferred Genres"
          value={preferredGenres}
          onChange={(e) => setPreferredGenres(e.target.value)}
        />
        <button type="submit">Update Preferences</button>
      </form>
    </div>
  );
};

export default PreferencesFormUpdate;
