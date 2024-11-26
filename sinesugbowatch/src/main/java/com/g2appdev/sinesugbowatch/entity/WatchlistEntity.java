package com.g2appdev.sinesugbowatch.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;

@Entity
public class WatchlistEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int watchlist_id;

    private String listname;
    
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(
        name = "watchlist_movies",
        joinColumns = @JoinColumn(name = "watchlist_id"),
        inverseJoinColumns = @JoinColumn(name = "movie_id")
    )
    private List<MoviesEntity> movies;

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
    
    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public List<MoviesEntity> getMovies() {
        return movies;
    }

    public void setMovies(List<MoviesEntity> movies) {
        this.movies = movies;
    }
}
