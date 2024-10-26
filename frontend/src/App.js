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
import Login from './components/Login'; // New Login component

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar remains visible on all pages */}
      <Routes>
        <Route path="/" element={<PopularMovies />} /> {/* Home route */}
        <Route path="/genre" element={<Genre />} /> {/* Genre route */}
        <Route path="/watchlist" element={<Watchlist />} /> {/* Watchlist route */}
        <Route path="/movie/:id" element={<MovieDetail />} /> {/* Movie detail route */}
        <Route path="/movies" element={<Movies />} /> {/* Movies route */}
        <Route path="/tv-shows" element={<TVShows />} /> {/* TV Shows route */}
        <Route path="/top-imdb" element={<TopIMDB />} /> {/* Top IMDB route */}
        <Route path="/recents" element={<Recents />} /> {/* Recents route */}
        <Route path="/login" element={<Login />} /> {/* Login route */}
      </Routes>
    </Router>
  );
}

export default App;
