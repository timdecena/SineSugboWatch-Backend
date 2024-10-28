package com.g2appdev.sinesugbowatch.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.g2appdev.sinesugbowatch.entity.MoviesEntity;

@Repository
public interface MoviesRepository extends JpaRepository<MoviesEntity, Integer> {
    // Method to find MoviesEntity by title
    public MoviesEntity findByTitle(String title);
}
