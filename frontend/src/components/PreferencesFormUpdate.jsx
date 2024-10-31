import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PreferencesFormCreate = () => {
  const [preference, setPreference] = useState({ recommendations: '', preferredGenres: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreference((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/preferences/createPreferences', preference);
      alert('Preference created successfully');
      navigate('/pref'); // Redirect to the preferences list
    } catch (error) {
      console.error('Error creating preference:', error);
      alert('Failed to create preference. Please check the console for details.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Preferences</h2>
      <label>
        Recommendations:
        <input
          type="text"
          name="recommendations"
          value={preference.recommendations}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Preferred Genres:
        <input
          type="text"
          name="preferredGenres"
          value={preference.preferredGenres}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <button type="submit">Create</button>
    </form>
  );
};

export default PreferencesFormCreate;
