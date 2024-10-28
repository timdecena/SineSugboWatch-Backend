package com.g2appdev.sinesugbowatch.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.g2appdev.sinesugbowatch.entity.SearchEntity;

@Repository
public interface SearchRepository extends JpaRepository<SearchEntity, Integer> {
    // Method to find Search by search query
	SearchEntity findBySearchquery(String searchquery);
}
