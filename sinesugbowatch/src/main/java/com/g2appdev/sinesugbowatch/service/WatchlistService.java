package com.g2appdev.sinesugbowatch.service;

import java.util.List;
import java.util.NoSuchElementException;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g2appdev.sinesugbowatch.entity.UserEntity;
import com.g2appdev.sinesugbowatch.entity.WatchlistEntity;
import com.g2appdev.sinesugbowatch.repository.UserRepository;
import com.g2appdev.sinesugbowatch.repository.WatchlistRepository;

@Service
public class WatchlistService {

    @Autowired
    private WatchlistRepository watchlistRepo;
    
    @Autowired
    UserRepository userRepo;

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
    public String deleteWatchlist(int id) {
        if (watchlistRepo.existsById(id)) {
            watchlistRepo.deleteById(id);
            return "Watchlist successfully deleted!";
        } else {
            return "Watchlist with ID " + id + " not found!";
        }
    }
}
