import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import PopularMovies from './components/PopularMovies';
import Genre from './components/Genre';
import Watchlist from './components/Watchlist';
import MovieDetail from './components/MovieDetail';
import Movies from './components/Movies';
import TVShows from './components/TVShows';
import TopIMDB from './components/TopIMDB';
import Recents from './components/Recents';
import Login from './components/Login';

// User management
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import UserUpdateForm from './components/UserUpdateForm';

// Admin management
import AdminForm from './components/AdminForm';
import AdminList from './components/AdminList';
import AdminUpdateForm from './components/AdminUpdateForm';

// Preferences management
import PreferencesForm from './components/PreferencesForm';
import PreferencesList from './components/PreferencesList';
import PreferencesFormUpdate from './components/PreferencesFormUpdate';

// Movie management
import MoviesForm from './components/MoviesForm';
import MoviesList from './components/MoviesList';
import MoviesUpdateForm from './components/MoviesUpdateForm';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<PopularMovies />} />
        <Route path="/genre" element={<Genre />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv-shows" element={<TVShows />} />
        <Route path="/top-imdb" element={<TopIMDB />} />
        <Route path="/recents" element={<Recents />} />
        <Route path="/login" element={<Login />} />

        {/* User Management */}
        <Route path="/create-user" element={<UserForm />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/update-user/:id" element={<UserUpdateForm />} />

        {/* Admin Management */}
        <Route path="/create-admin" element={<AdminForm />} />
        <Route path="/admins" element={<AdminList />} />
        <Route path="/update-admin/:id" element={<AdminUpdateForm />} />

        {/* Preferences Management */}
        <Route path="/create-pref" element={<PreferencesForm />} />
        <Route path="/pref" element={<PreferencesList />} />
        <Route path="/update-pref/:id" element={<PreferencesFormUpdate />} />

        {/* Movie Management */}
        <Route path="/create-movie" element={<MoviesForm />} />
        <Route path="/movielist" element={<MoviesList />} />
        <Route path="/update-movie/:id" element={<MoviesUpdateForm />} />

        
      </Routes>
    </Router>
  );
}

export default App;
