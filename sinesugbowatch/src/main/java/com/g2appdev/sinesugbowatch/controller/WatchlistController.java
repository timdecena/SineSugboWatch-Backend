package com.g2appdev.sinesugbowatch.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.g2appdev.sinesugbowatch.entity.MoviesEntity;
import com.g2appdev.sinesugbowatch.entity.WatchlistEntity;
import com.g2appdev.sinesugbowatch.service.WatchlistService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/watchlist")
public class WatchlistController {

    @Autowired
    private WatchlistService watchlistService;

    @GetMapping("/print")
    public String print() {
        return "Hello, Watchlist Management!";
    }

    // Create
    @PostMapping("/postWatchlistRecord")
    public WatchlistEntity postWatchlistRecord(@RequestBody WatchlistEntity watchlist) {
        return watchlistService.postWatchlistRecord(watchlist);
    }

    // Read
    @GetMapping("/getAllWatchlists")
    public List<WatchlistEntity> getAllWatchlists() {
        return watchlistService.getAllWatchlists();
    }

    // Update
    @PutMapping("/putWatchlistDetails")
    public WatchlistEntity putWatchlistDetails(@RequestParam int id, @RequestBody WatchlistEntity newWatchlistDetails) throws Exception {
        return watchlistService.putWatchlistDetails(id, newWatchlistDetails);
    }

    // Delete
    @DeleteMapping("/deleteWatchlistDetails/{id}")
    public String deleteWatchlist(@PathVariable int id) {
        return watchlistService.deleteWatchlist(id);
    }

    // WatchlistController.java

    // Update
    @PutMapping("/updateWatchlistDetails/{id}")
    public ResponseEntity<?> updateWatchlist(@PathVariable int id, @RequestBody WatchlistEntity updatedWatchlist) {
        try {
            WatchlistEntity updated = watchlistService.updateWatchlist(id, updatedWatchlist);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update watchlist.");
     }
}

    // Add a movie to a watchlist
    @PostMapping("/{watchlistId}/addMovie/{movieId}")
    public ResponseEntity<WatchlistEntity> addMovieToWatchlist(
            @PathVariable int watchlistId,
            @PathVariable int movieId) {
        return ResponseEntity.ok(watchlistService.addMovieToWatchlist(watchlistId, movieId));
    }


    // Remove a movie from a watchlist
    @DeleteMapping("/{watchlistId}/removeMovie/{movieId}")
    public ResponseEntity<WatchlistEntity> removeMovieFromWatchlist(
            @PathVariable int watchlistId,
            @PathVariable int movieId) {
        return ResponseEntity.ok(watchlistService.removeMovieFromWatchlist(watchlistId, movieId));
    }

    // Get all movies in a watchlist
    @GetMapping("/{watchlistId}/movies")
    public ResponseEntity<List<MoviesEntity>> getMoviesInWatchlist(@PathVariable int watchlistId) {
        return ResponseEntity.ok(watchlistService.getMoviesInWatchlist(watchlistId));
    }

}
