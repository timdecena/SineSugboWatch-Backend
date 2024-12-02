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
      alert('Error adding preference. Only 1 preference per user is allowed.');
    }
  };

  return (
    <div className="form-container">
      <h2>Add Preferences</h2>
      <form onSubmit={handleCreatePreference}>
        <input
          type="text"
          placeholder="Favorite Movie"
          value={recommendations}
          onChange={(e) => setRecommendations(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Favorite Genre"
          value={preferredGenres}
          onChange={(e) => setPreferredGenres(e.target.value)}
          required
        />
        <button type="submit" className="add-preference-btn">Add Preferences</button>
      </form>
    </div>
  );
};

export default PreferencesForm;
