package com.g2appdev.sinesugbowatch.entity;

import jakarta.persistence.*;

@Entity
public class PreferencesEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int preference_id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    private String recommendations;
    private String preferredGenres;

    // Constructors
    public PreferencesEntity() {
    }

    public PreferencesEntity(int preference_id, UserEntity user, String recommendations, String preferredGenres) {
        this.preference_id = preference_id;
        this.user = user;
        this.recommendations = recommendations;
        this.preferredGenres = preferredGenres;
    }

    // Getters and Setters
    public int getPreference_id() {
        return preference_id;
    }

    public void setPreference_id(int preference_id) {
        this.preference_id = preference_id;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public String getRecommendations() {
        return recommendations;
    }

    public void setRecommendations(String recommendations) {
        this.recommendations = recommendations;
    }

    public String getPreferredGenres() {
        return preferredGenres;
    }

    public void setPreferredGenres(String preferredGenres) {
        this.preferredGenres = preferredGenres;
    }
}
