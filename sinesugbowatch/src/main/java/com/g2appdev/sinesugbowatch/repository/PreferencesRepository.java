package com.g2appdev.sinesugbowatch.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.g2appdev.sinesugbowatch.entity.PreferencesEntity;

@Repository
public interface PreferencesRepository extends JpaRepository<PreferencesEntity, Integer> {
    // Method to find PreferencesEntity by recommendations
    public PreferencesEntity findByRecommendations(String recommendations);
}