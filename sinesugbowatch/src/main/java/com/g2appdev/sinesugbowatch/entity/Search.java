package com.g2appdev.sinesugbowatch.entity;

import jakarta.persistence.*;

@Entity
public class Search {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int search_id;

    private String searchquery;
    private String searchdate;
    
    @Column(name = "user_id")
    private int user_id;

    public Search() {
        super();
    }

    public Search(int search_id, String searchquery, String searchdate, int user_id) {
        super();
        this.search_id = search_id;
        this.searchquery = searchquery;
        this.searchdate = searchdate;
        this.user_id = user_id;
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

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }
}
