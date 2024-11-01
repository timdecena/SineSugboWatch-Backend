// App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PopularMovies from './components/PopularMovies';
import Navbar from './components/Navbar';
import Genre from './components/Genre';
import Watchlist from './components/Watchlist';
import MovieDetail from './components/MovieDetail';
import Movies from './components/Movies';
import TVShows from './components/TVShows';
import TopIMDB from './components/TopIMDB';
import Recents from './components/Recents';
import Login from './components/Login';

// Import User management components
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import UserUpdateForm from './components/UserUpdateForm';

// Import Admin management components
import AdminForm from './components/AdminForm';
import AdminList from './components/AdminList';
import AdminUpdateForm from './components/AdminUpdateForm';
import PreferencesForm from './components/PreferencesForm';
import PreferencesList from './components/PreferencesList';
import PreferencesFormUpdate from './components/PreferencesFormUpdate';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Existing Routes */}
        <Route path="/" element={<PopularMovies />} />
        <Route path="/genre" element={<Genre />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv-shows" element={<TVShows />} />
        <Route path="/top-imdb" element={<TopIMDB />} />
        <Route path="/recents" element={<Recents />} />
        <Route path="/login" element={<Login />} />

        {/* User Management Routes */}
        <Route path="/create-user" element={<UserForm />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/update-user/:id" element={<UserUpdateForm />} />

        {/* Admin Management Routes */}
        <Route path="/create-admin" element={<AdminForm />} />          {/* For creating an admin */}
        <Route path="/admins" element={<AdminList />} />                {/* For viewing the list of admins */}
        <Route path="/update-admin/:id" element={<AdminUpdateForm />} /> {/* For updating an admin by ID */}

        <Route path="/create-pref" element={<PreferencesForm />} />          {/* For creating an admin */}
        <Route path="/pref" element={<PreferencesList />} />                {/* For viewing the list of admins */}
        <Route path="/update-pref/:id" element={<PreferencesFormUpdate />} />                {/* For viewing the list of admins */}
      </Routes>
    </Router>
  );
}

export default App;
