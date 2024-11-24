package com.g2appdev.sinesugbowatch.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int transaction_id;

    private String paymentmethod;
    private double paymentprice;
    
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "user_id")
    private UserEntity user;
    
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "movie_id")
    private MoviesEntity movies;
 
    public Transaction() {
        super();
    }

    public Transaction(int transaction_id, String paymentmethod, double paymentprice) {
        super();
        this.transaction_id = transaction_id;
        this.paymentmethod = paymentmethod;
        this.paymentprice = paymentprice;
        
    }

    // Getters and Setters
    public int getTransaction_id() {
        return transaction_id;
    }

    public void setTransaction_id(int transaction_id) {
        this.transaction_id = transaction_id;
    }

    public String getPaymentmethod() {
        return paymentmethod;
    }

    public void setPaymentmethod(String paymentmethod) {
        this.paymentmethod = paymentmethod;
    }

    public double getPaymentprice() {
        return paymentprice;
    }

    public void setPaymentprice(double paymentprice) {
        this.paymentprice = paymentprice;
    }
    
    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public MoviesEntity getMovies() {
        return movies;
    }

    public void setMovies(MoviesEntity movies) {
        this.movies = movies;
    }


}
