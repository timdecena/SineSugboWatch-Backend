package com.g2appdev.sinesugbowatch.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@JsonPropertyOrder({"movie_id", "title", "genre", "description", "rating", "admin"})
@Entity
public class MoviesEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int movie_id;
    
    @OneToMany(mappedBy = "movies", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Transaction> transaction;
    
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "adminId")
    private Admin admin;

    private String title;
    private String genre;
    private String description;
    private double price;
    private double rating;
    

    public MoviesEntity() {
        super();
    }

    public MoviesEntity(int movie_id, String title, String genre, String description, double price, double rating) {
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

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }
    
    public Admin getAdmin() {
        return admin;
    }

    public void setAdmin(Admin admin) {
        this.admin = admin;
    }

}
