package com.g2appdev.sinesugbowatch.service;

import java.util.List;
import java.util.NoSuchElementException;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g2appdev.sinesugbowatch.entity.MoviesEntity;
import com.g2appdev.sinesugbowatch.entity.UserEntity;
import com.g2appdev.sinesugbowatch.entity.WatchlistEntity;
import com.g2appdev.sinesugbowatch.repository.MoviesRepository;
import com.g2appdev.sinesugbowatch.repository.UserRepository;
import com.g2appdev.sinesugbowatch.repository.WatchlistRepository;

import jakarta.transaction.Transactional;

@Service
public class WatchlistService {

    @Autowired
    private WatchlistRepository watchlistRepo;
    
    @Autowired
    UserRepository userRepo;

    @Autowired
    private MoviesRepository moviesRepo;

    // Create
    public WatchlistEntity postWatchlistRecord(WatchlistEntity watchlist) {
        // Fetch the UserEntity associated with the user_id from the watchlist
        UserEntity user = userRepo.findById(watchlist.getUser().getUser_id())
                .orElseThrow(() -> new NoSuchElementException("User with ID " + watchlist.getUser().getUser_id() + " does not exist."));
        
        // Set the fetched user entity to the watchlist
        watchlist.setUser(user);
        
        // Save the watchlist entity with the associated user
        return watchlistRepo.save(watchlist);
    }


    // Read
    public List<WatchlistEntity> getAllWatchlists() {
        return watchlistRepo.findAll();
    }

    // Update
    public WatchlistEntity putWatchlistDetails(int id, WatchlistEntity newWatchlistDetails) throws NameNotFoundException {
        WatchlistEntity watchlist = watchlistRepo.findById(id)
            .orElseThrow(() -> new NameNotFoundException("Watchlist " + id + " not found"));
        watchlist.setListname(newWatchlistDetails.getListname());
        return watchlistRepo.save(watchlist);
    }

    // Delete
    @Transactional
    public String deleteWatchlist(int id) {
        if (watchlistRepo.existsById(id)) {
            watchlistRepo.deleteById(id);
            return "Watchlist successfully deleted!";
        } else {
            return "Watchlist with ID " + id + " not found!";
        }
    }

        // WatchlistService.java

    public WatchlistEntity updateWatchlist(int id, WatchlistEntity updatedWatchlist) throws NameNotFoundException {
        WatchlistEntity watchlist = watchlistRepo.findById(id)
            .orElseThrow(() -> new NameNotFoundException("Watchlist with ID " + id + " not found."));
    
        watchlist.setListname(updatedWatchlist.getListname());
    // You can add any other fields that need updating here

        return watchlistRepo.save(watchlist);
}

     public WatchlistEntity addMovieToWatchlist(int watchlistId, int movieId) {
        WatchlistEntity watchlist = watchlistRepo.findById(watchlistId)
                .orElseThrow(() -> new NoSuchElementException("Watchlist with ID " + watchlistId + " not found."));
        MoviesEntity movie = moviesRepo.findById(movieId)
                .orElseThrow(() -> new NoSuchElementException("Movie with ID " + movieId + " not found."));

        watchlist.getMovies().add(movie);
        return watchlistRepo.save(watchlist);
    }

    // Remove a movie from a watchlist
    public WatchlistEntity removeMovieFromWatchlist(int watchlistId, int movieId) {
        WatchlistEntity watchlist = watchlistRepo.findById(watchlistId)
                .orElseThrow(() -> new NoSuchElementException("Watchlist with ID " + watchlistId + " not found."));
        MoviesEntity movie = moviesRepo.findById(movieId)
                .orElseThrow(() -> new NoSuchElementException("Movie with ID " + movieId + " not found."));

        watchlist.getMovies().remove(movie);
        return watchlistRepo.save(watchlist);
    }

    // Fetch movies in a watchlist
    public List<MoviesEntity> getMoviesInWatchlist(int watchlistId) {
        WatchlistEntity watchlist = watchlistRepo.findById(watchlistId)
                .orElseThrow(() -> new NoSuchElementException("Watchlist with ID " + watchlistId + " not found."));
        return watchlist.getMovies();
    }

}
