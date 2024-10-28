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

// Import the new User management components
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import UserUpdateForm from './components/UserUpdateForm';

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

        {/* New User Management Routes */}
        <Route path="/create-user" element={<UserForm />} />          {/* For creating a user */}
        <Route path="/users" element={<UserList />} />               {/* For viewing the list of users */}
        <Route path="/update-user/:id" element={<UserUpdateForm />} /> {/* For updating a user by ID */}
      </Routes>
    </Router>
  );
}

export default App;
