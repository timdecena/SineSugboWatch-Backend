package com.g2appdev.sinesugbowatch.entity;

import jakarta.persistence.*;

@Entity
public class PreferencesEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int preference_id;

    private String recommendations;
    private String preferredgenres;

    public PreferencesEntity() {
        super();
    }

    public PreferencesEntity(int preference_id, String recommendations, String preferredgenres) {
        super();
        this.preference_id = preference_id;
        this.recommendations = recommendations;
        this.preferredgenres = preferredgenres;
    }

    // Getters and Setters
    public int getPreference_id() {
        return preference_id;
    }

    public void setPreference_id(int preference_id) {
        this.preference_id = preference_id;
    }

    public String getRecommendations() {
        return recommendations;
    }

    public void setRecommendations(String recommendations) {
        this.recommendations = recommendations;
    }

    public String getPreferredgenres() {
        return preferredgenres;
    }

    public void setPreferredgenres(String preferredgenres) {
        this.preferredgenres = preferredgenres;
    }
}
