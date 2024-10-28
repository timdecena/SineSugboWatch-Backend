package com.g2appdev.sinesugbowatch.entity;

import jakarta.persistence.*;

@Entity
public class MoviesEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int movie_id;

    private String title;
    private String genre;
    private String description;
    private double rating;

    public MoviesEntity() {
        super();
    }

    public MoviesEntity(int movie_id, String title, String genre, String description, double rating) {
        super();
        this.movie_id = movie_id;
        this.title = title;
        this.genre = genre;
        this.description = description;
        this.rating = rating;
    }

    // Getters and Setters
    public int getMovie_id() {
        return movie_id;
    }

    public void setMovie_id(int movie_id) {
        this.movie_id = movie_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }
}
