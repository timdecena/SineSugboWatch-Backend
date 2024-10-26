package com.g2appdev.sinesugbowatch.entity;

import jakarta.persistence.*;

@Entity
public class WatchlistEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int watchlist_id;

    private String listname;

    public WatchlistEntity() {
        super();
    }

    public WatchlistEntity(int watchlist_id, String listname) {
        super();
        this.watchlist_id = watchlist_id;
        this.listname = listname;
    }

    // Getters and Setters
    public int getWatchlist_id() {
        return watchlist_id;
    }

    public void setWatchlist_id(int watchlist_id) {
        this.watchlist_id = watchlist_id;
    }

    public String getListname() {
        return listname;
    }

    public void setListname(String listname) {
        this.listname = listname;
    }
}
