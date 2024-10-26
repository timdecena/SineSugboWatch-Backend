package com.g2appdev.sinesugbowatch.entity;

import jakarta.persistence.*;

@Entity
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int transaction_id;

    private String paymentmethod;
    
    @Column(name = "user_id")
    private int user_id;

    @Column(name = "movie_id")
    private int movie_id;

    public Transaction() {
        super();
    }

    public Transaction(int transaction_id, String paymentmethod, int user_id, int movie_id) {
        super();
        this.transaction_id = transaction_id;
        this.paymentmethod = paymentmethod;
        this.user_id = user_id;
        this.movie_id = movie_id;
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

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public int getMovie_id() {
        return movie_id;
    }

    public void setMovie_id(int movie_id) {
        this.movie_id = movie_id;
    }
}
