package com.g2appdev.sinesugbowatch.entity;

import jakarta.persistence.*;

@Entity
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int transaction_id;

    private String paymentmethod;
    
 
    public Transaction() {
        super();
    }

    public Transaction(int transaction_id, String paymentmethod, int user_id, int movie_id) {
        super();
        this.transaction_id = transaction_id;
        this.paymentmethod = paymentmethod;
        
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

}
