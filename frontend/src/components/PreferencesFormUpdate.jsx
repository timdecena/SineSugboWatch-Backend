import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const PreferencesFormUpdate = () => {
  const { id } = useParams();
  const [preference, setPreference] = useState({ recommendations: '', preferredgenres: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPreference = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/preferences/getPreferencesDetails/${id}`);
        setPreference(response.data);
      } catch (error) {
        console.error('Error fetching preference:', error);
      }
    };

    fetchPreference();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreference((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/preferences/updatePreferencesDetails/${id}`, preference);
      alert('Preferences updated successfully');
      navigate('/pref'); 
    } catch (error) {
      console.error('Error updating preferences:', error);
      alert('Failed to update preferences. Please check the console for details.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Preferences</h2>
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
          name="preferredgenres"
          value={preference.preferredgenres}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <button type="submit">Update</button>
    </form>
  );
};

export default PreferencesFormUpdate;