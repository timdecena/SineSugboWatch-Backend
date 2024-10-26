package com.g2appdev.sinesugbowatch.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.g2appdev.sinesugbowatch.entity.WatchlistEntity;
import com.g2appdev.sinesugbowatch.service.WatchlistService;

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
}
