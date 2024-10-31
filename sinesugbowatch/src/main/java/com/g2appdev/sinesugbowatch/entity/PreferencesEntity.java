package com.g2appdev.sinesugbowatch.entity;

import jakarta.persistence.*;

@Entity
public class PreferencesEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int preferenceId;  // Changed to camelCase for consistency

    private String recommendations;
    private String preferredGenres;  // Changed to camelCase for consistency

    @OneToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    public PreferencesEntity() {
        super();
    }

    public PreferencesEntity(int preferenceId, String recommendations, String preferredGenres) {
        super();
        this.preferenceId = preferenceId;  // Updated to match field name
        this.recommendations = recommendations;
        this.preferredGenres = preferredGenres;  // Updated to match field name
    }

    // Getters and Setters
    public int getPreferenceId() {  // Updated method name
        return preferenceId;
    }

    public void setPreferenceId(int preferenceId) {  // Updated method name
        this.preferenceId = preferenceId;
    }

    public String getRecommendations() {
        return recommendations;
    }

    public void setRecommendations(String recommendations) {
        this.recommendations = recommendations;
    }

    public String getPreferredGenres() {  // Updated method name
        return preferredGenres;
    }

    public void setPreferredGenres(String preferredGenres) {  // Updated method name
        this.preferredGenres = preferredGenres;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }
}
