package com.g2appdev.sinesugbowatch.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class SearchEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int search_id;

    private String searchquery;
    private String searchdate;
    
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "user_id")
    private UserEntity user;
    

    public SearchEntity() {
        super();
    }

    public SearchEntity(int search_id, String searchquery, String searchdate, int user_id) {
        super();
        this.search_id = search_id;
        this.searchquery = searchquery;
        this.searchdate = searchdate;
    }

    // Getters and Setters
    public int getSearch_id() {
        return search_id;
    }

    public void setSearch_id(int search_id) {
        this.search_id = search_id;
    }

    public String getSearchquery() {
        return searchquery;
    }

    public void setSearchquery(String searchquery) {
        this.searchquery = searchquery;
    }

    public String getSearchdate() {
        return searchdate;
    }

    public void setSearchdate(String searchdate) {
        this.searchdate = searchdate;
    }
    
    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

}
