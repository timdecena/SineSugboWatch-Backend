// src/components/PreferencesForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import '../assets/PreferencesForm.css';

const PreferencesForm = () => {
  const [recommendations, setRecommendations] = useState('');
  const [preferredGenres, setPreferredGenres] = useState('');
  const userId = localStorage.getItem('user_id');

  const handleCreatePreference = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/preferences/postPreferencesRecord', {
        recommendations,
        preferredgenres: preferredGenres,
        user: { user_id: userId },
      });
      alert(`Preference added: ${response.data.recommendations}`);
      setRecommendations('');
      setPreferredGenres('');
    } catch (error) {
      console.error('Error adding preference:', error);
      alert('Error adding preference. That only 1 preference per user');
    }
  };

  return (
    <div>
      <h2>Add Preferences</h2>
      <form onSubmit={handleCreatePreference}>
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
        <button type="submit">Add Preferences</button>
      </form>
    </div>
  );
};

export default PreferencesForm;